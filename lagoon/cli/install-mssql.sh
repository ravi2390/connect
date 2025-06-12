case $(uname -m) in
    x86_64)   architecture="amd64" ;;
    arm64)   architecture="arm64" ;;
    *) architecture="unsupported" ;;
esac
if [[ "unsupported" == "$architecture" ]];
then
    echo "Alpine architecture $(uname -m) is not currently supported.";
    exit;
fi

#Download the desired package(s)
#curl -O https://download.microsoft.com/download/7/6/d/76de322a-d860-4894-9945-f0cc5d6a45f8/msodbcsql18_18.4.1.1-1_$architecture.apk
#curl -O https://download.microsoft.com/download/7/6/d/76de322a-d860-4894-9945-f0cc5d6a45f8/mssql-tools18_18.4.1.1-1_$architecture.apk
curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.10.5.1-1_$architecture.apk
curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.10.1.1-1_$architecture.apk

#Install the package(s)
#apk add --allow-untrusted msodbcsql18_18.4.1.1-1_$architecture.apk
#apk add --allow-untrusted mssql-tools18_18.4.1.1-1_$architecture.apk
apk add --allow-untrusted msodbcsql17_17.10.5.1-1_$architecture.apk
apk add --allow-untrusted mssql-tools_17.10.1.1-1_$architecture.apk
