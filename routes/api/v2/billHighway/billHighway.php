<?php

use App\Http\Controllers\BillHighway;
use Illuminate\Support\Facades\Route;

Route::put('billHighway/updateBillHighwayIndividual', [BillHighway\BillHighwayController::class, 'UpdateIndividual']);
Route::post('billHighway/moveToLocalPayrollDeduction', [BillHighway\BillHighwayController::class, 'MoveToLocalPayrollDeduction']);
Route::post('billHighway/copeCancelPayment', [BillHighway\BillHighwayController::class, 'CopeCancelPayment']);
Route::post('billHighway/updateCopeAmount', [BillHighway\BillHighwayController::class, 'UpdateCopeAmount']);
