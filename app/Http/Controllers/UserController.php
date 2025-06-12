<?php

namespace App\Http\Controllers;

use App\Models\Affiliate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class UserController
{
    public function show(): JsonResource
    {
        $user = Auth::user();
        if ($user && empty($user->profile?->selected_entity)) {
            $user->getDefaultAccess();
        }

        return new JsonResource(Auth::user()->setAppends(['selectedAffiliate']));
    }

    public function setSelectedEntity(Request $request): JsonResource
    {
        $user = Auth::user();
        if ($user) {
            $user->profile->selected_entity = [
                'entity_type' => $request->input('entityType', Affiliate::class),
                'entity_id' => $request->request->getInt('entityId'),
            ];
            $user->profile->save();
        }

        return new JsonResource(Auth::user()->setAppends(['selectedAffiliate']));
    }

    public function getAffiliateUserList()
    {
        $user = Auth::user();
        $selectedAffiliateId = $user->selectedAffiliate->AffiliateId;
        $users = User::query()
            ->with('authorizations', 'authorizations.entity')
            ->whereHas('authorizations', function ($q) use ($selectedAffiliateId): void {
                $q->whereIn('entity_id', Arr::wrap($selectedAffiliateId))->whereNull('DeletedAt');
            })
            ->orderBy('name', 'ASC')
            ->get();

        return JsonResource::collection($users);
    }

    public function login(Request $request): JsonResource
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $return =[];
        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('AppName')->accessToken;

            //$token = $user->createToken('Token Name')->accessToken;
            $return['token'] = $token;
            $return['user'] = Auth::user();
        }
        return new JsonResource($return);
    }
}
