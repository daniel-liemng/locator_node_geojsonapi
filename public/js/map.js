mapboxgl.accessToken =
  "pk.eyJ1IjoiaGxpZW0iLCJhIjoiY2s0eXk2bHQ2MDF6dDNkazcyZmlicXoyYyJ9.Y_gNuZffvpAR_C10g6wyJg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-79.413685, 43.760923]
});

// fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  // console.log(data);
  // create new structure of data
  const stores = data.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        // modified
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      // modified
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });
  loadMap(stores);
}

// load map with stores
function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
          // features: [
          //   {
          //     type: "Feature",
          //     geometry: {
          //       type: "Point",
          //       // modified
          //       coordinates: [-79.413685, 43.760923]
          //     },
          //     // modified
          //     properties: {
          //       storeId: "0005",
          //       icon: "shop"
          //     }
          //   }
          // ]
        }
      },
      layout: {
        // modified
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

// call
// loadMap();
getStores();
