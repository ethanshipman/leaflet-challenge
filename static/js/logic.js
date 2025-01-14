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
  
// Adding legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  let div = L.DomUtil.create("div");
  div.style.backgroundColor = "white";
  div.style.padding = "10px";
  div.style.borderRadius = "5px";
  div.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";
  div.style.fontSize = "12px";
  div.style.lineHeight = "18px";
  
  // title for the legend
  let title = L.DomUtil.create("h4", "", div);
  title.textContent = "Earthquake Depth (km)";
  title.style.margin = "0 0 10px";
  title.style.textAlign = "left";
  
  // Depth intervals
  let depths = [-10, 10, 30, 50, 70, 90];
  
  // legend row for each depth interval
  depths.forEach((depth, index) => {
    // adding a container for the legend row
    let row = L.DomUtil.create("div", "", div);
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.marginBottom = "5px";
  
      // color box
    let colorBox = L.DomUtil.create("span", "", row);
    colorBox.style.backgroundColor = markerColor(depth + 1);
    colorBox.style.width = "18px";
    colorBox.style.height = "18px";
    colorBox.style.marginRight = "8px";
    colorBox.style.border = "1px solid black";
    colorBox.style.opacity = "0.8";
  
          
    let label = L.DomUtil.create("span", "", row);
    label.textContent =
        index < depths.length - 1
            ? `${depth}–${depths[index + 1]}`
            : `${depth}+`;
    label.style.color = "#555";
  });
  
    return div;
};
legend.addTo(map);