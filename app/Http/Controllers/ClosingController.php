<?php

namespace App\Http\Controllers;

use App\Models\Closing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClosingController extends Controller
{
    public function getBatasWaktu()
    {
        $closing = Closing::first();
        return response()->json(['batas_waktu' => $closing->batas_waktu]);
    }

    public function getTipe()
    {
        $closing = DB::table('closings')->select('tipe')->first();
        return response()->json(['tipe' => $closing->tipe]);
    }

    public function update(Request $request, $id)
    {
        $closing = Closing::where('id', $id)->first();
        if ($closing) {
            $closing->batas_waktu = $request->input('batas_waktu');
            $closing->tipe = $request->input('tipe');
            $closing->save();
            return response()->json(['message' => 'Data berhasil diupdate']);
        }else{
            return response()->json(['message' => 'Data tidak ditemukan']);
        }
    }
}
            