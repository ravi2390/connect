<?php

/*
 * @file
 * Test aft/muse_api/src/Http/Controllers/LookupListsController.php.
 *
 * @todo This test should be moved to the aft/muse_api package.
 *
 * @todo These tests only work when a test DB is present in `ddev`. It
 * should be possible to mock the DB responses to enable testing in
 * other environments.
 *
 * @todo `assertJsonStructure()` will pass as long as the JSON response
 * _includes_ the given structure. It will not fail if there are
 * unspecified, additional, items. This is a problem for any Model
 * declaring `$appends` because JSON serialization will include those
 * keys in the response, potentially breaking API consumers.
 */

namespace Tests\Feature\Http\Controllers\Muse;

use Aft\Audit\Auditable;
use App\Models\Country;
use App\Models\Gender;
use App\Models\IndividualDeactivationReason;
use App\Models\Prefix;
use App\Models\Suffix;
use App\Models\StateTerritory;
use App\Models\UnionRelationshipType;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Testing\TestResponse;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Tests\TestCase;

class LookupListsControllerTest extends TestCase
{
    use Auditable;
    use DatabaseTransactions;

    protected $connectionsToTransact = ['aftdb', 'sqlsrv', 'member'];

    private array $ignoredAppends = ['label', 'label_plural', 'display_name'];

    #[\Override]
    protected function setUp(): void
    {
        parent::setUp();

        static::setGlobalAuditing(false);
        Passport::actingAsClient(new Client());
    }

    #[\Override]
    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testScopePrefix(): void
    {
        $jsonData = [
            'returnScope' => [
                'prefix',
            ],
        ];
        $jsonStructure = [
            'prefix' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('prefix.0', $response);
        $this->softDeleteModel(Prefix::class, $jsonData, 'prefix');
    }

    public function testScopeSuffix(): void
    {
        $jsonData = [
            'returnScope' => [
                'suffix',
            ],
        ];
        $jsonStructure = [
            'suffix' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('suffix.0', $response);
        $this->softDeleteModel(Suffix::class, $jsonData, 'suffix');
    }

    public function testScopeGender(): void
    {
        $jsonData = [
            'returnScope' => [
                'gender',
            ],
        ];
        $jsonStructure = [
            'gender' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('gender.0', $response);
        $this->softDeleteModel(Gender::class, $jsonData, 'gender');
    }

    public function testScopeStateTerritory(): void
    {
        $jsonData = [
            'returnScope' => [
                'stateTerritory',
            ],
        ];
        $jsonStructure = [
            'stateTerritory' => [
                '*' => [
                    'code',
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('stateTerritory.0', $response);
        $this->softDeleteModel(StateTerritory::class, $jsonData, 'stateTerritory');
    }

    public function testScopeUnionRelationshipType(): void
    {
        $jsonData = [
            'returnScope' => [
                'unionRelationshipType',
            ],
        ];
        $jsonStructure = [
            'unionRelationshipType' => [
                '*' => [
                    'id',
                    'name',
                    'DisplayOrder',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->softDeleteModel(UnionRelationshipType::class, $jsonData, 'unionRelationshipType');
    }

    public function testScopeLocalDuesCategory(): void
    {
        $jsonData = [
            'returnScope' => [
                'localDuesCategory',
            ],
        ];

        /* An affiliateNumber is required */
        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(400);
        unset($response);

        /* FIXME: This is a particular `affiliateNumber` from the test
         * data (AFTDB_tag1_4_17.bak) that happens to print something.
         *
         * Ideally, this should be a fully faked request+response. */
        $jsonData['affiliateNumber'] = 'NNECT';
        $jsonStructure = [
            'localDuesCategory' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('localDuesCategory.0', $response);

        $jsonData['affiliateNumber'] = 'WrongNumber';

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(404)
            ->assertJsonStructure(['error', 'scope']);
    }

    public function testScopeCountry(): void
    {
        $jsonData = [
            'returnScope' => [
                'country',
            ],
        ];
        $jsonStructure = [
            'country' => [
                '*' => [
                    'code',
                    'id',
                    'name',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->noAppendsInJson('country.0', $response);
        $this->softDeleteModel(Country::class, $jsonData, 'country');
    }

    public function testScopeIndividualDeactivationReason(): void
    {
        $jsonData = [
            'returnScope' => [
                'individualDeactivationReason',
            ],
        ];
        $jsonStructure = [
            'individualDeactivationReason' => [
                '*' => [
                    'id',
                    'name',
                    'DisplayOrder',
                    'ApplicableToMember',
                    'ApplicableToPotentialMember',
                    'ApplicableToAgencyFee',
                    'ApplicableToRetiree',
                    'ApplicableToOther',
                ],
            ],
        ];

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonStructure($jsonStructure);

        $this->softDeleteModel(IndividualDeactivationReason::class, $jsonData, 'individualDeactivationReason');
    }

    private function softDeleteModel(string $model, array $jsonData, string $jsonKey): void
    {
        $itemsTotal = $model::count();
        $deletedItem = $model::all()->first();

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount($itemsTotal, $jsonKey);

        $deletedItem->delete();

        $this->assertEquals(($itemsTotal - 1), $model::count());

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount(($itemsTotal - 1), $jsonKey);

        $deletedItem->restore();

        $this->assertEquals($itemsTotal, $model::count());

        $response = $this->postJson(route('muse.getLookupLists'), $jsonData);
        $response
            ->assertStatus(200)
            ->assertJsonCount($itemsTotal, $jsonKey);
    }

    /*
     * Test that $ignoredAppends keys are not in the JSON response.
     *
     * The models generated by aft/datamodel include additional
     * attributes in the Model::$appends property. These attributes will
     * be merged with the data-backed ones through the HasAttributes
     * trait.
     *
     * We do not want the appended attributes in API responses. The best
     * we can do is filter them out at the end of our query building
     * (->each->setAppends([]). This function ensures that any action
     * like that succeeded and the known appended attributes are not
     * present in the given key.
     *
     * @see \Illuminate\Database\Concerns\BuildQueries::each()
     * @see \Illuminate\Database\Eloquent\Model::jsonSerialize()
     * @see \Illuminate\Database\Eloquent\Concerns\HasAttributes::attributesToArray()
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
