<?php

namespace Database\Seeders;

use App\Models\Closing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClosingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Closing::create([
            'batas_waktu' => '2024-07-04 08:00:00', // contoh batas waktu 10 hari dari sekarang
            'tipe' => 'Buka', // Buka atau Tutup, Buka untuk waktu memulaikan pendaftaran, Tutup untuk waktu menutup pendaftaran
        ]);
    }
}
