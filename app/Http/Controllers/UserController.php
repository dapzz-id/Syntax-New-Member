<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tbuser;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Index');
    }

    public function showRegisterForm()
    {
        return Inertia::render('Register');
    }

    public function checkCookie(Request $request)
    {
        $deviceToken = $request->cookie('device_token');
        if ($deviceToken) {
            return redirect()->route('dashboard');
        }else{
            return redirect()->route('register');
        }
    }

    public function register(Request $request)
    {
        $user = Tbuser::create([
            'email' => $request->email,
            'nis' => $request->nis,
            'nama' => $request->nama,
            'alasan' => $request->alasan,
            'kelas' => $request->kelas,
            'no_telp' => $request->noTelp,
        ]);

        $deviceToken = uniqid();
        return redirect()->route('dashboard')->withCookie(cookie('device_token', $deviceToken, 60 * 24 * 10));
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }
}