function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            var latitude = "latitude=" + position.coords.latitude;
            var longitude = "&longitude=" + position.coords.longitude;
            var query = latitude + longitude + "&localityLanguage=en";

            const Http = new XMLHttpRequest();

            var bigdatacloud_api = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
            bigdatacloud_api += query;
            Http.open("GET", bigdatacloud_api);
            Http.send();
            Http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var result = JSON.parse(this.responseText);
                    console.log(result);
                }
            }
        });
    } else {
        alert("geolocation failed")
    }
}