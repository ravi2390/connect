@extends('layouts.splash')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card bg-dark text-light">
                <div class="card-header bg-secondary"><img alt="{{ __('Login') }}" src="{{ asset('images/logos/AFTConnectLogo.png') }}"></div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input tabindex="1" id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input tabindex="2" id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input tabindex="3" class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0 mobile-login-row">
                            <div class="col-md-8 offset-md-4 mobile-login-buttons">
                                @if (Route::has('password.request'))
                                    <a tabindex="5" class="btn btn-link btn-secondary active" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                                <button tabindex="4" type="submit" class="btn btn-primary login-btn">
                                    {{ __('Login') }}
                                </button>
                            </div>
                        </div>
                        <hr class="login-hr" noshade>
                        <div class="form-group row mb-0 mobile-login-row">
                            <div class="col-md-8 offset-md-4 mobile-login-buttons">
                                    <a tabindex="5" class="btn btn-link btn-secondary active get-connected-btn" href="https://awa.knack.aft.org/aftdatasupport#get-connected">
                                        {{ __('I would like to get connected!') }}
                                    </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
