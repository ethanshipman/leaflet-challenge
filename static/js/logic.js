// Creating map object and tilelayer
let map = L.map("map", {
  center: [39.8283, -98.5795], // Center on San Francisco
  zoom: 4
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(map);

// function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 3;
}

// function to determine marker color based on depth
function markerColor(depth) {
  return depth > 90 ? "#ff5f65" :
         depth > 70 ? "#fca35d" :
         depth > 50 ? "#fdb72a" :
         depth > 30 ? "#f7db11" :
         depth > 10 ? "#dcf400" :
                      "#a3f600";
}

