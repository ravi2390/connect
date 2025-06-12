<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} | {{ config('staffbeta.name') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    @vite(['packages/aft/staffbeta/resources/js/app.js', 'resources/sass/app.scss', 'packages/aft/staffbeta/resources/sass/app.scss'])
</head>
<body>
<div id="app">
</div>
@yield('content')
</body>
</html>
