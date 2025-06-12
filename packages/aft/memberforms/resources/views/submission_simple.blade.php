@extends('memberforms::layouts.simple')
<?php
use Carbon\Carbon;
?>
@section('content')

    <div style="width: 100%; position: relative;">
        @if ($form->show_aft_logo || $form->show_fed_logo || $form->show_local_logo)
        <div style="height: 50px; padding-bottom: 16px;">
            <!-- LEFT logo -->
            @if ($form->show_aft_logo)
                <div style="position: absolute; left: 0;">
                    <img
                        src="{!! $aftLogo !!}"
                        alt='Aft logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @elseif ($form->show_aft_logo == false && $form->show_fed_logo == true)
                <div style="position: absolute; left: 0;">
                    <img
                        src="{!! $fedLogo !!}"
                        alt='FED logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @elseif ($form->show_aft_logo == false && $form->show_fed_logo == false)
                <div style="position: absolute; left: 0;">
                    <img
                        alt='Aft logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @endif
            <!-- MIDDLE logo -->
            @if ($form->show_fed_logo && $form->show_aft_logo && $form->show_local_logo)
                <div style="position: absolute; left: 50%; transform: translateX(-50%);">
                    <img
                        src="{!! $fedLogo !!}"
                        alt='FED logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @endif
            <!-- RIGHT logo -->
            @if ($form->show_local_logo)
                <div style="position: absolute; right: 0;">
                    <img
                        src="{!! $localLogo !!}"
                        alt='LOCAL logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @elseif ($form->show_fed_logo && $form->show_local_logo == false)
                <div style="position: absolute; right: 0;">
                    <img
                        src="{!! $fedLogo !!}"
                        alt='FED logo'
                        style="max-height:45px;background-size:contain;">
                </div>
            @endif
        </div>
        @endif
        <p
            style="text-align: center; padding: 12px 32px; background-color: #E3F2FD; margin-bottom: 24px;">
                <strong>{{ $form->display_name }}</strong>
        </p>
    </div>
    <!-- <hr style="width: 100%; margin-left: 0; color:gray"> -->
    <p>
        {!! $form->description !!}
    </p>
    @foreach ($submissionData as $item)
        <p>
            @if (isset($item['data_label']) && ltrim($item['data_label']) != '')
                @if ($item['data_label'] === 'Token')
                    <strong>Payment Information:</strong>
                @else
                    <strong>{{ $item['data_label']  }}:</strong>
                @endif
            @endif
            @switch($item['data_type'])
                @case('textarea')
                        {!! $item['data_value'] !!}
                    @break
                @case('workLocation')
                    <table border="0" style="margin-left: 16px">
                        @foreach ($item['data_value'] as $workLocation)
                            <tr>
                                @if (isset($workLocation['data_label']) && ltrim($workLocation['data_label']) != '')
                                    <td>
                                       <strong>{{ $workLocation['data_label'] }}:</strong>
                                    </td>
                                @endif
                                    <td>
                                        {{ $workLocation['data_value'] }}
                                    </td>
                            </tr>
                        @endforeach
                    </table>
                    @break
                @case('workStructure')
                    <table border="0" style="margin-left: 16px">
                        @foreach ($item['data_value'] as $workStructure)
                            <tr>
                                @if (isset($workStructure['data_label']) && ltrim($workStructure['data_label']) != '')
                                    <td>
                                        <strong>{{ $workStructure['data_label'] }}:</strong>
                                    </td>
                                @endif
                                    <td>
                                        {{ $workStructure['data_value'] }}
                                    </td>
                            </tr>
                        @endforeach
                    </table>
                    @break
                @case('address')
                    <table border="0" style="width: 100%; table-layout: fixed; margin-left: 16px;">
                        @foreach ($item['data_value'] as $address)
                            <tr>
                                @if (isset($address['data_label']) && ltrim($address['data_label']) != '')
                                    <td style="width: 20%;">
                                        <strong>{{ $address['data_label'] }}:</strong>
                                    </td>
                                @endif
                                @if (isset($address['data_type']) && ltrim($address['data_type']) == 'checkbox')
                                    @if (isset($address['data_value']) && $address['data_value'])
                                        <td>
                                            Yes
                                        </td>
                                    @else
                                        <td>
                                            No
                                        </td>
                                    @endif
                                @else
                                    <td>
                                        {{ $address['data_value'] }}
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                    </table>
                    @break
                @case('email')
                    @foreach ($item['data_value'] as $emails)
                            <table border="0" style="width: 100%; table-layout: fixed; margin-left: 16px;">
                                @foreach ($emails['data_value'] as $email)
                                    <tr>
                                        @if (isset($email['data_label']) && ltrim($email['data_label']) != '')
                                            <td style="width: 25%; text-align: right;">
                                                <strong>{{ $email['data_label'] }}:</strong>
                                            </td>
                                        @endif
                                        @if (isset($email['data_type']) && ltrim($email['data_type']) == 'checkbox')
                                            @if (isset($email['data_value']) && $email['data_value'])
                                                <td style="padding-left: 12px;">
                                                    Yes
                                                </td>
                                            @else
                                                <td style="padding-left: 12px;">
                                                    No
                                                </td>
                                            @endif
                                        @else
                                            <td style="padding-left: 12px;">
                                                {{ $email['data_value'] }}
                                            </td>
                                        @endif
                                    </tr>
                                @endforeach
                            </table>
                    @endforeach
                @break
                @case('phone')
                    @foreach ($item['data_value'] as $phones)
                            <table border="0" style="width: 100%; table-layout: fixed; margin-left: 16px;">
                                @foreach ($phones['data_value'] as $phone)
                                    <tr>
                                        @if (isset($phone['data_label']) && ltrim($phone['data_label']) != '')
                                            <td style="width: 20%; text-align: right;">
                                                <strong>{{ $phone['data_label'] }}:</strong>
                                            </td>
                                        @endif
                                        @if (isset($phone['data_type']) && ltrim($phone['data_type']) == 'checktext')
                                            @if (isset($phone['data_value']) && $phone['data_value'])
                                                <td style="padding-left: 12px;">
                                                    Opt for text
                                                </td>
                                            @else
                                                <td style="padding-left: 12px;">
                                                    {{-- Assuming you want to display nothing if 'data_value' is falsey --}}
                                                </td>
                                            @endif
                                        @elseif (isset($phone['data_type']) && ltrim($phone['data_type']) == 'checkbox')
                                            @if (isset($phone['data_value']) && $phone['data_value'])
                                                <td style="padding-left: 12px;">
                                                    Yes
                                                </td>
                                            @else
                                                <td style="padding-left: 12px;">
                                                    No
                                                </td>
                                            @endif
                                        @else
                                            <td style="padding-left: 12px;">
                                                @if (isset($phone['data_label'])
                                                    && ltrim($phone['data_label']) != 'Ext'
                                                    && ltrim($phone['data_label']) != 'Country'
                                                    )
                                                    {{  '(' .
                                                        substr($phone['data_value'], 0, 3) .
                                                        ') ' .
                                                        substr($phone['data_value'], 3, 3) .
                                                        '-' .
                                                        substr($phone['data_value'], 6) }}
                                                @else
                                                    {{ $phone['data_value'] }}
                                                @endif
                                            </td>
                                        @endif
                                    </tr>
                                @endforeach
                            </table>
                    @endforeach
                @break
                @case('payment')
                    <table border="0" style="margin-left: 16px">
                        <tr>
                            <td style="">Payment Method:</td>
                            <td>
                                {{ isset(json_decode($item['data_value'])->CardDetails)
                                    ? 'Credit Card'
                                    : 'Bank Draft' }}
                            </td>
                        </tr>
                        <tr>
                            <td style="">Type:</td>
                            <td>
                                {{ isset(json_decode($item['data_value'])->CardDetails)
                                    ? json_decode($item['data_value'])->CardDetails->CardType
                                    : json_decode($item['data_value'])->AchDetails->AccountType }}
                            </td>
                        </tr>
                        <tr>
                            <td style="">Account No. Last Four:</td>
                            <td>
                                {{ isset(json_decode($item['data_value'])->CardDetails)
                                    ? json_decode($item['data_value'])->CardDetails->Last4
                                    : json_decode($item['data_value'])->AchDetails->AccountNumberLast4 }}
                            </td>
                        </tr>
                    </table>
                    @break
                @case('drawing')
                    <img style="max-width: 100%" src="{!! $item['data_value'] !!}">
                    <p align="right">
                        {{$submittedBy}} <br>
                        {{$submittedOn}}
                    </p>
                    @break
                @case('checktext')
                    <span>{{ $item['data_value'] === '1' ? 'Yes': 'No' }}</span>
                    @break
                @case('date')
                    <span>{{ \Carbon\Carbon::createFromFormat('Y-m-d', $item['data_value'])->format('m/d/Y') }}</span>
                    @break
                @case('LocalDuesCategory')
                    <span>{{ $item['data_value'] }}</span>
                    @break
                @default
                    <span>{{ $item['data_value'] }}</span>
            @endswitch
        </p>
    @endforeach
    {{-- <p align="right">
        {{$submittedBy}} <br>
        {{$submittedOn}}
    </p> --}}
@endsection
