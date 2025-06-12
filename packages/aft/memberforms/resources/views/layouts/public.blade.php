<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} | Forms</title>

    @if(config('services.google_recaptcha.enabled', false))
    <script src="https://www.google.com/recaptcha/enterprise.js?render={{  config('services.google_recaptcha.key') }}" async defer></script>
    @endif

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    @vite(['packages/aft/memberforms/resources/js/public.js', 'resources/sass/app.scss', 'packages/aft/memberforms/resources/sass/public.scss'])

</head>
<body>
<div id="app">
</div>
@yield('content')
</body>
</html>
