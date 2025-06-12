<?php

namespace Tests\Feature;

use Laravel\Passport\Passport;
use Tests\TestCase;

class AffiliateTest extends TestCase
{
    protected $perPage = 1;

    /**
     * A basic feature test example.
     */
    public function testExample(): void
    {
        Passport::actingAs($this->getUser(), ['*']);

        $response = $this->getJson("/api/v2/affiliate?scope=global&page=1&per_page={$this->perPage}&sort=AffiliateId&include=affiliateAddresses,affiliatePhones,affiliateEmails");
        $response->assertStatus(200);

        $data = json_decode($response->content(), true)['data'];

        $this->assertCount($this->perPage, $data);

        $this->assertArrayHasKey('affiliateAddresses', $data[0]);
        $this->assertArrayHasKey('affiliatePhones', $data[0]);
        $this->assertArrayHasKey('affiliateEmails', $data[0]);
    }
}
