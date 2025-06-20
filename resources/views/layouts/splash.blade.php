<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    @if (!empty($imagesPrefetch))
        @foreach ($imagesPrefetch as $image)
            <link rel="preload" as="image" href="{{ $image }}">
        @endforeach
    @endif


    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    @vite(['resources/sass/app.scss'])

</head>
<body class="splash bg-primary">
    <div id="app">
        <main class="my-5">
            @yield('content')
        </main>
    </div>
</body>
</html>
