@extends('ssrs::layouts.reports')

@section('content')
    <h1>Dev Raw Report Output</h1>

    @isset($items)
        <h2>Items:</h2>
        <ul>
            @foreach($items as $item)
                <li>{{ $item['Name'] }}</li>
            @endforeach
        </ul>
    @endisset

    @isset ($html)
        <h2>HTML:</h2>
        {!! $html !!}
    @endisset

@endsection
