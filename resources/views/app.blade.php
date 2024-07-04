<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title inertia>{{ config('app.name', 'Syntax Community') }}</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/style.css')}}">
    <link rel="icon" href="https://syntx.id/images/sfav.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .fade-in { 
          animation: fadeIn 1s ease-in forwards;
        }
        ::-webkit-scrollbar{
          width: 0;
        }
        @supports (-ms-ime-align: auto){
            html{
                -ms-overflow-style: -ms-autohiding-scrollbar;
            }
        }
    </style>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen font-sans antialiased">
    @inertia
</body>
</html>
