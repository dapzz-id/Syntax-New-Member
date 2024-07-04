<?php

use App\Http\Controllers\ClosingController;
use App\Models\Tbstudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/students/{nis}', function ($nis) {
    $student = Tbstudent::where('nis', $nis)->first();
    if ($student) {
        return response()->json(['exists' => true, 'nama' => $student->nama, 'kelas' => $student->kelas]);
    } else {
        return response()->json(['exists' => false]);
    }
});
Route::get('/batas-waktu', [ClosingController::class, 'getBatasWaktu']);
Route::get('/tipe', [ClosingController::class, 'getTipe']);
Route::put('/closings/{id}', [ClosingController::class, 'update']);