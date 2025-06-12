<?php

/*
 * @file
 * Test aft/muse_api/src/Http/Controllers/AffiliateIDsDataController.php.
 *
 * @todo This test should be moved to the aft/muse_api package.
 *
 * @todo These tests only work when a test DB is present in `ddev`. It
 * should be possible to mock the DB responses to enable testing in
 * other environments.
 */

namespace Tests\Feature\Http\Controllers\Muse;

use Aft\Audit\Auditable;
use Aft\MuseApi\Http\Controllers\AffiliateIDsDataController;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Testing\TestResponse;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Tests\TestCase;

class AffiliateIDsDataControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected $connectionsToTransact = ['aftdb', 'sqlsrv', 'member'];

    private array $ignoredAppends = ['label', 'label_plural', 'display_name'];

    private array $jsonStructure = [
        'Affiliates' => [
            [
                'AffiliateId',
                'AffiliateNumber',
                'AffiliateName',
                'ParentAffiliateId',
                'ParentAffiliateNumber',
                'ParentAffiliateName',
            ]
        ],
        'Employers',
        'Units',
        'JobTitles',
        'LocalJobClasses',
        'WorkLocations',
        'WorkStructures',
        'LocalDuesCategories',
    ];

    // FIXME: This is a known test ID, but the test should be using
    // mock data instead.
    private array $jsonData = [
        'AffiliateNumber' => 'NNECT',
    ];

    // FIXME: These are known quantities for id=NNECT. These should
    // be mock data too.
    private array $jsonCounts = [
        'Employers' => 2,
        'Units' => 4,
        'JobTitles' => 5,
        'LocalJobClasses' => 4,
        'WorkLocations' => 2,
        'WorkStructures' => 2,
        'LocalDuesCategories' => 7,
    ];

    #[\Override]
    protected function setUp(): void
    {
        parent::setUp();

        Auditable::setGlobalAuditing(false);
        Passport::actingAsClient(new Client());
    }

    #[\Override]
    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testBadPayloadKey(): void
    {
        $response = $this->postJson(route('muse.getAffiliateIDsData', ['id' => 'WrongId']));
        $response
            ->assertStatus(422)
            ->assertJsonStructure(['message']);
    }

    public function testBadPayloadValue(): void
    {
        $response = $this->postJson(route('muse.getAffiliateIDsData', ['AffiliateNumber' => 'WrongId']));
        $response
            ->assertStatus(422)
            ->assertJsonStructure(['message']);
    }

    public function testAffiliateNotFound(): void
    {
        $response = $this->postJson(route('muse.getAffiliateIDsData', ['AffiliateNumber' => 'Wrong']));
        $response
            ->assertStatus(404)
            ->assertJsonStructure(['message']);
    }

    public function testFullAffiliateData(): void
    {
        $response = $this->postJson(route('muse.getAffiliateIDsData', $this->jsonData));
        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->jsonStructure);

        foreach (array_diff_key($this->jsonStructure, array_flip(['Affiliates'])) as $key => $value) {
            $this->noAppendsInJson(sprintf('%s.0', $value), $response);
        }
        foreach ($this->jsonStructure['Affiliates'][0] as $value) {
            $this->noAppendsInJson(sprintf('Affiliates.%s.0', $value), $response);
        }

        $response->assertJsonCount(1, 'Affiliates');
        // FIXME: Until there is proper mock data, these tests are incomplete
        // as data could vary by db/environment. Re-enable when available.
        // foreach ($this->jsonCounts as $key => $count) {
        //     $response->assertJsonCount($count, $key);
        // }
    }

    public function testSoftDeletesInData(): void
    {
        $baseData = AffiliateIDsDataController::buildAffiliateIDsData('NNECT');
        $deletedItems = [];

        // Delete one item from each group
        foreach ($this->jsonCounts as $key => $count) {
            // Establish the original counts.
            $this->jsonCounts[$key] = count($baseData[$key]);
            // Delete the item.
            $deletedItems[$key] = $baseData[$key]->last();
            $this->assertTrue($deletedItems[$key]->delete());
        }

        $response = $this->postJson(route('muse.getAffiliateIDsData', $this->jsonData));
        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->jsonStructure);

        // FIXME: This is relative to the original list of counts. It should be
        // based on mock data.
        //
        // The queries that make up this response depend on each other,
        // reusing IDs and other fields. This means that it is not
        // possible to naively "substract one" of each of these counts
        // and assert against that.
        foreach ($this->jsonCounts as $key => $count) {
            $this->assertTrue(count($response[$key]) < $count || $count === 0);
        }

        unset($response);

        // Restore all deleted items
        foreach ($deletedItems as $item) {
            $this->assertTrue($item->restore());
        }

        $response = $this->postJson(route('muse.getAffiliateIDsData', $this->jsonData));
        $response
            ->assertStatus(200)
            ->assertJsonStructure($this->jsonStructure);

        foreach ($this->jsonCounts as $key => $count) {
            $response->assertJsonCount($count, $key);
        }
    }

    private function softDeleteModel($model, array $jsonData, string $jsonKey): void
    {
        $itemsTotal = $model::count();
        $deletedItem = $model::all()->first();

        $response = $this->postJson(route('muse.getAffiliateIDsData'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount($itemsTotal, $jsonKey);

        $deletedItem->delete();

        $this->assertEquals(($itemsTotal - 1), $model::count());

        $response = $this->postJson(route('muse.getAffiliateIDsData'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount(($itemsTotal - 1), $jsonKey);

        $deletedItem->restore();

        $this->assertEquals($itemsTotal, $model::count());

        $response = $this->postJson(route('muse.getAffiliateIDsData'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount($itemsTotal, $jsonKey);
    }

    /*
     * Test that $ignoredAppends keys are not in the JSON response.
     *
     * @todo This should be deprecated once we can test against mocked
     * data.
     */
    private function noAppendsInJson(string $jsonKey, TestResponse $response): void
    {
        foreach ($this->ignoredAppends as $appendValue) {
            $jsonPath = sprintf('%s.%s', $jsonKey, $appendValue);
            $response->assertJsonPath($jsonPath, null);
        }
    }
}
