/**
  Populate a semi-temporary table with basic Individual data, plus the latest
  modified dates for each related table. By pulling from this table (filtered
  by the affiliate and the maximum modified data seen in members of that
  affiliate), we don't have to execute any legacy queries for that individual
  unless we determine we actually have to migrate some of their data.
 */
SELECT * INTO _legacy_mdates FROM
(SELECT DISTINCT
    -- Basic identification and contact data.
    IndAff.LocalUnionNbr, IndAff.IndividualId, IndAff.IndividualAffiliateId, IndAff.EmployerId, IndDet.PrimaryEmail, IndDet.SecondaryEmail,
    IndDet.HomePhone, IndDet.MobilePhone,
    -- Omit address records where the member is not the owner.
    CASE WHEN Addr.mdate IS NULL THEN NULL ELSE IndDet.AddressId END AS AddressId,
    CASE WHEN HomeAddr.mdate IS NULL THEN NULL ELSE IndDet.HomeAddressId END AS HomeAddressId,
    CASE WHEN AltAddr.mdate IS NULL THEN NULL ELSE IndDet.AltAddressId END AS AltAddressId,
    -- CreateDate is applied to email/phone records, which because they don't have separate TABLES
    -- in the legacy DB inherit the creation date of the detail record containing them.
    IndDet.cdate AS DetailCreateDate,
    -- Updated dates for each distinct data item.
    IndDet.mdate AS DetailUpdateDate, IndAff.mdate AS IndAffUpdateDate,	MemIds.MemIdsUpdateDate, Ldr.LeaderUpdateDate,Com.CommentsUpdateDate,Cope.COPEUpdateDate,
    HomeAddr.mdate AS HomeAddressUpdateDate, Addr.mdate AS AddressUpdateDate, AltAddr.mdate AS AltAddressUpdateDate,
    -- If the latest updated date for all components is before that of the last member migrated
    -- for a given affiliate, we can ignore that member on a given migration run.
    (SELECT MAX(LastUpdateDate) FROM (VALUES
                                      (IndAff.mdate), (IndDet.mdate), (HomeAddr.mdate), (Addr.mdate), (AltAddr.mdate), (MemIdsUpdateDate), (LeaderUpdateDate), (CommentsUpdateDate) ) AS UpdateDate (LastUpdateDate)
    ) AS LastUpdateDate
FROM
    IndividualAffiliate IndAff (nolock)
        INNER JOIN IndividualDetail IndDet (nolock) ON IndAff.IndividualId=IndDet.IndividualId
        INNER JOIN Affiliate Aff (nolock) ON Aff.AffiliateId=IndAff.LocalUnionId
        LEFT JOIN Address HomeAddr (nolock) ON
                HomeAddr.AddressId=IndDet.HomeAddressId AND HomeAddr.AddressOwnerId=IndDet.IndividualId
        LEFT JOIN Address Addr (nolock) ON
                Addr.AddressId=IndDet.AddressId AND Addr.AddressOwnerId=IndDet.IndividualId
        LEFT JOIN Address AltAddr (nolock) ON
                AltAddr.AddressId=IndDet.AltAddressId AND AltAddr.AddressOwnerId=IndDet.IndividualId
        -- These tables have multiple rows per IndividualAffiliate record.
        -- Get the latest updated date from those rows.
        LEFT JOIN
            (SELECT MemIdsInner.IndividualId,MemIdsInner.LocalUnionNbr,MAX(mdate) AS MemIdsUpdateDate
             FROM IndividualMemberIDs MemIdsInner (nolock)
             GROUP BY MemIdsInner.IndividualId,MemIdsInner.LocalUnionNbr) MemIds
            ON IndAff.IndividualId=MemIds.IndividualId AND IndAff.LocalUnionNbr=MemIds.LocalUnionNbr
        LEFT JOIN
            (SELECT LdrInner.IndividualId,MAX(mdate) AS LeaderUpdateDate
             FROM Leadership LdrInner (nolock)
             GROUP BY LdrInner.IndividualId) Ldr
            ON IndAff.IndividualId=Ldr.IndividualId
        LEFT JOIN
            (SELECT ComInner.IndividualId,MAX(mdate) AS CommentsUpdateDate
             FROM IndividualComments ComInner (nolock)
             GROUP BY ComInner.IndividualId) Com
            ON IndAff.IndividualId=Com.IndividualId
        LEFT JOIN
            (SELECT CopeInner.IndividualId,CopeInner.LocalUnionNbr,MAX(mdate) AS COPEUpdateDate
             FROM COPE CopeInner (nolock)
             GROUP BY CopeInner.IndividualId,CopeInner.LocalUnionNbr) Cope
            ON IndAff.IndividualId=Cope.IndividualId AND IndAff.LocalUnionNbr=Cope.LocalUnionNbr
        LEFT JOIN vw_affiliate_connect vw (nolock) ON vw.AffiliateId=Aff.AffiliateId
WHERE
    -- Only include active members of active affiliates.
    IndAff.MemberStatusName='active'
        AND Aff.StatusFlag IN ('a', 'r')
        AND Aff.AffiliateType<>'v'
        -- Exclude 1.0 affiliates.
        AND vw.AffiliateNbr IS NULL) q;

-- We query the table by LocalUnionNbr and sort the results by LastUpdateDate.
CREATE CLUSTERED INDEX AffiliateIdx ON _legacy_mdates (LocalUnionNbr, LastUpdateDate);
