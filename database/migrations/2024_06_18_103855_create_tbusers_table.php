<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbusers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique()->required();
            $table->bigInteger('nis')->unique()->required();
            $table->string('alasan');
            $table->string('kelas');
            $table->string('nama');
            $table->bigInteger('no_telp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbusers');
    }
};
