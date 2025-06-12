<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use Aft\Permissions\Models\AuthAbility;
use Aft\Permissions\Models\Authorization;
use Aft\Permissions\Models\AuthRole;
use Aft\Permissions\Models\AuthUserAbility;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\Individual;
use App\Models\WorkLocation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function index(Request $request)
    {
        $data = Validator::make($request->all(), [
            'filterUserName' => 'nullable|string|max:255',
            'filterUserEmail' => 'nullable|string|max:255',
            'filterUserStatus' => 'nullable|string|max:255',
        ])->validate();

        $query = User::with('authorizations', 'authorizations.entity');

        if (! empty($data['filterUserName'])) {
            $searchUserName = '%'.preg_replace('/\s+/', '%', (string) $data['filterUserName']).'%';
            $query->where('name', 'like', $searchUserName);
        }
        if (! empty($data['filterUserEmail'])) {
            $searchUserEmail = '%'.preg_replace('/\s+/', '%', (string) $data['filterUserEmail']).'%';
            $query->where('email', 'like', $searchUserEmail);
        }

        if (! empty($data['filterUserStatus']) && $data['filterUserStatus'] == 'deleted') {
            $query = $query->onlyTrashed();
        }

        $users = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($users);
    }

    /**
     * @return \Aft\Permissions\Models\Authorization[]
     */
    protected function validateUserAuthorizations($newAuthorizations): array
    {
        $authorizations = [];
        foreach ($newAuthorizations as $authorization) {
            $entityType = $authorization['entityTypeName'];
            $entityId = $authorization['entityId'];
            $inherit = $authorization['inherit'];
            $order = $authorization['order'];
            $roleId = $authorization['role']['id'];
            if (! class_exists($entityType)) {
                throw new \Exception('Could not find entity '.$entityType);
            }
            if ($entityId != 0) {
                $entity = $entityType::find($entityId);
                if (empty($entity)) {
                    throw new \Exception('Could not find entity '.$entityType.':'.$entityId);
                }
                $entity_type = $entity::class;
            } else {
                $entity_type = \App\Models\Affiliate::class;
            }

            $role = AuthRole::find($roleId);
            if (empty($role)) {
                throw new \Exception('Role ID not found '.$roleId);
            }
            $authorizations[] = new Authorization([
                'user_id' => 0,
                'role_id' => $role->id,
                'entity_type' => $entity_type,
                'entity_id' => $entityId,
                'entity_inherit' => $inherit,
                'order' => $order,
            ]);
        }

        return $authorizations;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'userType' => 'required',
            'userName' => 'required|string|max:255',
            'userEmail' => 'required|email|unique:users,email|max:255',
            'userPassword' => 'required|string|min:8,max:255',
            'userPasswordReset' => 'boolean',
            'userIndividual' => 'required',
            'authorizations' => 'required_unless:userType,staff|array',
            'authorizations.*' => 'required_unless:userType,staff',
        ])->validate();

        $user = new User([
            'name' => $data['userName'],
            'email' => $data['userEmail'],
            'password' => Hash::make($data['userPassword']),
            'password_expires_at' => $data['userPasswordReset'] ? now() : null,
            'individual_id' => $data['userIndividual'],
            'type' => $data['userType'],
        ]);

        $authorizations = $this->validateUserAuthorizations($data['authorizations']);

        DB::transaction(function () use ($user, $authorizations): void {
            $user->save();
            foreach ($authorizations as $authorization) {
                $authorization->user_id = $user->id;
                $authorization->save();
            }
        });

        return response([
            'success' => true,
            'user' => $user->getKey(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('authorizations', 'authorizations.entity')->find($id);
        $user->AffiliateName = null;
        $user->AffiliateId = null;
        $individual = Individual::with('individualAffiliates', 'individualMembers', 'individualAffiliates.Affiliate')->find($user->individual_id);
        if ($individual) {
            $individualAffiliate = $individual->individualAffiliates[0];
            if ($individualAffiliate->AffiliateId) {
                $affiliate = Affiliate::find($individualAffiliate->AffiliateId);
                $user->affiliate = $affiliate;
                if ($affiliate) {
                    $user->AffiliateName = $affiliate->AffiliateName;
                    $user->AffiliateId = $affiliate->AffiliateId;
                }
            }
            $user->individual = $individual;
        }
        $user->options = $this->options();

        return response($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Validator::make($request->all(), [
            'userType' => 'required|string',
            'userId' => 'required|integer',
            'userName' => 'required|string|max:255',
            'userEmail' => 'required|email|max:255',
            'userPassword' => 'nullable|string|min:8,max:255',
            'userPasswordReset' => 'boolean',
            'userIndividual' => 'required',
            'authorizations' => 'required_unless:userType,staff|array',
            'authorizations.*' => 'required_unless:userType,staff',
            'userAbilities.*' => 'nullable|array',
        ])->validate();

        if ($data['userId'] !== (int) $id) {
            throw new \Exception('User ID missmatch');
        }

        $user = User::find($id);

        if ($user->email !== $data['userEmail']) {
            $otherUser = User::where('email', '=', $data['userEmail'])->first();
            if (! empty($otherUser)) {
                throw new \Exception('Email address already taken');
            }
        }

        $user->name = $data['userName'];
        $user->email = $data['userEmail'];
        $user->individual_id = $data['userIndividual'];
        if (! empty($data['userPassword'])) {
            $user->password = Hash::make($data['userPassword']);
        }
        if ($data['userPasswordReset']) {
            $user->password_expires_at = $data['userPasswordReset'] ? now() : null;
        }
        $user->type = $data['userType'];

        $newUserAbilities = collect($data['userAbilities'] ?? []);
        // remove abilities
        foreach ($user->AuthUserAbilities as $ability) {
            if (! $newUserAbilities->contains('id', $ability->ability_id)) {
                $ability->delete();
            }
        }
        // add abilities
        foreach ($newUserAbilities as $ability) {
            if (! $user->AuthUserAbilities->contains('id', $ability['id'])) {
                $newAbility = new AuthUserAbility([
                    'user_id' => $user->id,
                    'ability_id' => $ability['id'],
                    'order' => 0,
                ]);
                $user->AuthUserAbilities()->save($newAbility);
            }
        }

        foreach ($user->authorizations as &$currAuth) {
            $found = false;
            foreach ($data['authorizations'] as $newAuthKey => &$newAuth) {
                $match = true;
                if ((int) $currAuth->role_id !== $newAuth['role']['id']) {
                    $match = false;
                }
                if ($currAuth->entity_type !== $newAuth['entityTypeName']) {
                    $match = false;
                }
                if ((int) $currAuth->entity_id !== $newAuth['entityId']) {
                    $match = false;
                }
                if ((int) $currAuth->entity_inherit !== $newAuth['inherit']) {
                    $match = false;
                }
                if ($match) {
                    $currAuth->order = $newAuth['order'];
                    unset($data['authorizations'][$newAuthKey]);
                    $found = true;
                    break;
                }
            }
            if (! $found) {
                $currAuth->delete();
            } else {
                $currAuth->save();
            }
        }

        $authorizations = $this->validateUserAuthorizations($data['authorizations']);

        DB::transaction(function () use ($user, $authorizations): void {
            $user->save();
            foreach ($authorizations as $authorization) {
                $authorization->user_id = $user->id;
                $authorization->save();
            }
        });

        $user->flushUserAuthorizationList();

        return response([
            'success' => true,
            'user' => $id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = User::find($id);
        $model->delete();

        return response([
            'success' => true,
            'user' => $id,
        ]);
    }

    public function restore($id)
    {
        $model = User::withTrashed()->find($id);
        $model->restore();

        return response([
            'success' => true,
            'user' => $id,
        ]);
    }

    public function options(): array
    {
        return [
            'entityTypes' => [
                ['type' => Affiliate::class, 'info' => new Affiliate()],
                ['type' => Chapter::class, 'info' => new Chapter(), 'disabled' => true],
                ['type' => WorkLocation::class, 'info' => new WorkLocation(), 'disabled' => true],
            ],
            'roles' => AuthRole::all(),
        ];
    }

    public function export()
    {
        return response()->streamDownload(function (): void {
            $columns = [
                'name',
                'email',
                'type',
                'authorizations',
                'individual_id',
                'last_login_at',
                'CreatedAt',
                'UpdatedAt',
            ];
            $file = fopen('php://output', 'w+');
            fputcsv($file, $columns);
            $query = User::with('authorizations', 'authorizations.entity')->without(['profile'])->get();
            foreach ($query as $user) {
                $authorizations = [];
                $row = [];
                foreach ($user->authorizations as $authorization) {
                    if ($authorization) {
                        $roleName = $authorization['role']['name'];
                        if ($authorization['entity_id'] == 0) {
                            $label = 'Global';
                            $tempNames = explode('\\', (string) $authorization['entity_type']);
                            $tempNamesCount = count($tempNames);
                            $display_name_index = $tempNamesCount > 0 ? $tempNamesCount - 1 : -1;
                            $display_name = $tempNamesCount >= 0 ? $tempNames[$display_name_index] : '';
                        } else {
                            $label = $authorization['entity'] ? $authorization['entity']['label'] : '';
                            $display_name = $authorization['entity'] ? $authorization['entity']['display_name'] : '';
                        }
                        $tempAuthorization = $roleName.':'.$label.' '.$display_name;
                        $authorizations[] = $tempAuthorization;
                    }
                }
                $tempRow = $user->toArray();
                foreach ($columns as $column) {
                    if ($column != 'authorizations') {
                        $row[$column] = $tempRow[$column];
                    }
                }
                $row['authorizations'] = implode(',', $authorizations);
                fputcsv($file, $row);
            }
            fclose($file);
        }, 'UserExport'.date('Y-m-d').'.csv');
    }

    public function abilities($id = null)
    {
        if (! empty($id)) {
            $user = User::find($id);
            $userAbilities = $user->AuthUserAbilities;
            $allAbilities = AuthAbility::orderBy('order')->get();
            foreach ($allAbilities as $ability) {
                if ($userAbilities->contains('ability_id', $ability->id)) {
                    $ability->selected = true;
                }
            }
        } else {
            $allAbilities = AuthAbility::orderBy('order')->get();
        }

        return $allAbilities;
    }
}
