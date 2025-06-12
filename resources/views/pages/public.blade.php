<!DOCTYPE html>
<html>
    <head>
        <title>{{ $contentBlock->title }}</title>
        <style>
            .content-block-title {
                font-size: 32px !important;
                color: #414464 !important;
                line-height: normal;
                font-family: "Roboto", Arial, Helvetica, sans-serif;
                font-weight: 700 !important;
                margin-bottom: 2px;
                margin-top: 0px;
                padding: 16px 4px;
                width: 100%;
            }
            .content-block-body {
                font-size: 15px;
                font-weight: 600;
                text-align: right;
                text-decoration: none !important;
                font-variant: tabular-nums;
                line-height: 1.5;
            }
            .aft-content {
                font-family: "Roboto", Arial, Helvetica, sans-serif;
            }
        </style>
    </head>
    <body>
        <div class="aft-content">
            <h1 class="content-block-title">{!! $contentBlock->title !!}</h1>
            <p class="content-block-body">{!! $contentBlock->content !!}</p>
        </div>
    </body>
</html>
