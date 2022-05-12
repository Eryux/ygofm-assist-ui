var toQueryString = function(obj) {
    var str = [];
    for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

export function SendRequest(type, url, data = null, on_complete = null)
{
    let xhr = new XMLHttpRequest();
    
    xhr.open(type, url, true);

    if (type == "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    if (data != null)
        xhr.send(toQueryString(data));
    else
        xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && on_complete != null)
            on_complete(this.status, this.responseText);
    };
}