<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/siswa.json");
        $students = json_decode($json, true);

        foreach ($students as $student) {
            DB::table('tbstudents')->insert([
                'nis' => $student['nis'],
                'nama' => $student['nama'],
                'kelas' => $student['kelas'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            // DB::table('users')->insert([
            //     'nis' => $student['nis'],
            //     'name' => $student['nama'],
            //     'password' => Hash::make($student['nis']),
            //     'remember_token' => Str::random(60),
            // ]);
        }
    }
}
