export const createWindyHTML = (lat: number, lon: number) => `
<!DOCTYPE html>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<html>
    <head>
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
        <script src="https://api.windy.com/assets/map-forecast/libBoot.js"></script>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }
            #windy {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id="windy"></div>
        <script src="script.js"></script>
    </body>
</html>
<script>
const options = {
    key: '77lXINwgXwWy3hQnOzgyJBjuucLLIR9k',

    verbose: true,

    lat: ${lat},
    lon: ${lon},
    zoom: 7,
};
const faIcon = L.divIcon({
    html: '<i class="fa-solid fa-location-dot" style="color:red; font-size:24px;"></i>',
    iconSize: [24, 24],
    className: 'custom-fa-icon' // để tránh CSS mặc định của Leaflet
});

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.marker([${lat}, ${lon}], { icon: faIcon })
        .addTo(map)
        .openPopup();
});</script>
  `;