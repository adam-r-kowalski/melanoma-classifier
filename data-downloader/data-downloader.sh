cd /data

wget --header="Host: isic-archive.com" --header="User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36" --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8" --header="Accept-Language: en-US,en;q=0.9" "https://isic-archive.com/api/v1/image/download?include=all&filter={%22operator%22:%22in%22,%22operands%22:[{%22identifier%22:%22meta.tags%22,%22type%22:%22string%22},[%22Challenge%202018:%20Task%203:%20Training%22,%22ISBI%202017:%20Test%22,%22ISBI%202017:%20Training%22,%22ISBI%202017:%20Validation%22]]}" -O "ISIC-images.zip" -c

unzip ISIC-images.zip
rm -rf ISIC-images.zip
