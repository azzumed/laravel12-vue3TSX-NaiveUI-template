<?php
declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
})->name('home');

Route::get('app/{any?}', function () {
    return view('app');
})->where('any', '.*');
