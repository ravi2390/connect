<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }} | Forms</title>
     <style>
        .ql-align-center {
            text-align: center !important;
        }
        
        .ql-align-right {
            text-align: right !important;
        }

        .ql-size-small {
            font-size: 12px !important;
        }

        .ql-size-large {
            font-size: 24px !important;
        }

        .ql-size-huge {
            font-size: 32px !important;
        }
      </style>
</head>
<body>
@yield('content')
</body>
</html>
