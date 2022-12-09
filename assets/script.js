var map = L.map('map').setView([51.505, -0.09], 5);
console.log(data);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
for (var i = 0; i < data.length; i++) {
    var marker = L.marker([data[i].CapitalLatitude, data[i].CapitalLongitude]).addTo(map);
}
