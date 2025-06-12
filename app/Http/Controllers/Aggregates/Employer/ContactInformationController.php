<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactInformationController extends Controller
{
    public function __invoke($id): JsonResource
    {
        return new JsonResource(Employer::with([
            'EmployerMainAddresses.ContactSource',
            'EmployerMainAddresses.StateTerritory',
            'EmployerMainPhones.ContactSource',
            'EmployerMainEmails.ContactSource',
        ])->find($id));
    }
}
