# https://docs.github.com/en/rest/reference/repos#get-a-release-asset
# GET /repos/{owner}/{repo}/releases/assets/{asset_id}

cd .github
mkdir tmp
org=socksthewolf
repo=deckconnectbridge
response_file=tmp/releases-latest.json
response=$(curl -sH "Authorization: Bearer ${TOKEN}" https://api.github.com/repos/${org}/${repo}/releases/latest > ${response_file} )

asset_id=$(cat ${response_file} | jq -r '.assets[0] .id')
asset_name=$(cat ${response_file} | jq -r '.assets[0] .name')
mkdir --parents ../_site/dl
curl ${curl_custom_flags} \
     -L \
     -H "Accept: application/octet-stream" \
     -H "Authorization: Bearer ${TOKEN}" \
        "https://api.github.com/repos/${org}/${repo}/releases/assets/${asset_id}" -o "../_site/dl/${asset_name}"

cd ..