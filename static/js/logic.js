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

// importing data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson").then(data => {
  console.log(data);
  // Looping to create markers
  data.features.forEach(feature => {
      let coords = feature.geometry.coordinates;
      let properties = feature.properties;

      // creating a circle marker
      L.circleMarker([coords[1], coords[0]], {
          radius: markerSize(properties.mag),
          fillColor: markerColor(coords[2]), // depth as the 3rd coordinate
          color: "#000",
          weight: 0.5,
          opacity: 1,
          fillOpacity: 0.8
      }).bindPopup(`
          <h3>${properties.place}</h3>
          <hr>
          <p><strong>Magnitude:</strong> ${properties.mag}</p>
          <p><strong>Depth:</strong> ${coords[2]} km</p>
      `).addTo(map);
  });
});