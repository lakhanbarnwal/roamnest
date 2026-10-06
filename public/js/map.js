// const map = new mapboxgl.Map({
//   accessToken: mapApi,
//   container: "map", // container ID
//   center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//   zoom: 9, // starting zoom
// });



  

//     const map = new mapboxgl.Map({
//         accessToken: mapApi,
//         container: 'map', // container ID
//         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//         style: 'mapbox://styles/mapbox/standard',
//         config: {
//             basemap: {
//                 theme: 'monochrome',
//                 lightPreset: 'night'
//             }
//         }, // style URL
//         zoom: 10, // starting zoom
//         center: coordinates // starting position
//     });

//     map.on('load', () => {
//         // Load an image from an external URL.
//         map.loadImage(
//             'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
//             (error, image) => {
//                 if (error) throw error;

//                 // Add the image to the map style.
//                 map.addImage('cat', image);

//                 // Add a data source containing one point feature.
//                 map.addSource('point', {
//                     'type': 'geojson',
//                     'data': {
//                         'type': 'FeatureCollection',
//                         'features': [
//                             {
//                                 'type': 'Feature',
//                                 'geometry': {
//                                     'type': 'Point',
//                                     'coordinates':coordinates
//                                 }
//                             }
//                         ]
//                     }
//                 });

//                 // Add a layer to use the image to represent the data.
//                 map.addLayer({
//                     'id': 'points',
//                     'type': 'symbol',
//                     'source': 'point', // reference the data source
//                     'layout': {
//                         'icon-image': 'cat', // reference the image
//                         'icon-size': 0.25
//                     }
//                 });
//             }
//         );
//     });


// const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//     "<h5>Exact location Provided After Booking</h5><p>" + Location + "</p>"
//   )) // add popups
//   .addTo(map);
const map = new mapboxgl.Map({
    accessToken: mapApi,
    container: "map",

    style: "mapbox://styles/mapbox/standard",

    config: {
        basemap: {
            theme: "monochrome",
            lightPreset: "night"
        }
    },

    zoom: 10,
    center: coordinates
});


// ======================================================
// CUSTOM MARKER
// ======================================================

const markerEl = document.createElement("div");

markerEl.className = "custom-marker";


// Front = Red Marker
// Back = Cat Image

markerEl.innerHTML = `
    <div class="marker-front"></div>

    <div class="marker-back">
        <img
            src="https://docs.mapbox.com/mapbox-gl-js/assets/cat.png"
            alt="Cat"
        />
    </div>
`;


// ======================================================
// POPUP
// ======================================================

const popup = new mapboxgl.Popup({
    offset: 35,

    // Popup ka close button nahi chahiye
    closeButton: false,

    // Map par click karne se automatically close nahi hoga
    closeOnClick: false
}).setHTML(`
    <div class="marker-popup">
        <h5>Exact location provided after booking</h5>
        <p>${Location}</p>
    </div>
`);


// ======================================================
// CREATE MARKER
// ======================================================

const marker = new mapboxgl.Marker(markerEl)
    .setLngLat(coordinates)
    .addTo(map);


// ======================================================
// MOUSE ENTER
// ======================================================

markerEl.addEventListener("mouseenter", () => {

    // Marker flip hoga
    markerEl.classList.add("flipped");

    // Text popup show hoga
    popup
        .setLngLat(coordinates)
        .addTo(map);

});


// ======================================================
// MOUSE LEAVE
// ======================================================

markerEl.addEventListener("mouseleave", () => {

    // Marker wapas red ho jayega
    markerEl.classList.remove("flipped");

    // Popup remove
    popup.remove();

});


// ======================================================
// CSS
// ======================================================

const style = document.createElement("style");

style.innerHTML = `

/* -----------------------------------------
   MAIN MARKER
----------------------------------------- */

.custom-marker {

    width: 45px;
    height: 45px;

    position: relative;

    cursor: pointer;

    perspective: 800px;

}


/* -----------------------------------------
   FRONT & BACK
----------------------------------------- */

.marker-front,
.marker-back {

    position: absolute;

    width: 45px;
    height: 45px;

    top: 0;
    left: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    backface-visibility: hidden;

    -webkit-backface-visibility: hidden;

    transition:
        transform 0.5s ease;

}


/* -----------------------------------------
   RED MARKER
----------------------------------------- */

.marker-front {

    width: 28px;
    height: 28px;

    top: 8px;
    left: 8px;

    background: red;

    border-radius:
        50%
        50%
        50%
        0;

    transform:
        rotate(-45deg);

}


/* -----------------------------------------
   CAT SIDE
----------------------------------------- */

.marker-back {

    transform:
        rotateY(180deg);

}


.marker-back img {

    width: 45px;

    height: 45px;

    object-fit: contain;

    pointer-events: none;

}


/* -----------------------------------------
   FLIP ANIMATION
----------------------------------------- */

.custom-marker.flipped .marker-front {

    transform:
        rotate(-45deg)
        rotateY(180deg);

}


.custom-marker.flipped .marker-back {

    transform:
        rotateY(0deg);

}


/* -----------------------------------------
   POPUP
----------------------------------------- */

.marker-popup {

    padding: 5px;

    min-width: 180px;

}


.marker-popup h5 {

    margin: 0 0 6px;

    font-size: 14px;

    font-weight: 600;

}


.marker-popup p {

    margin: 0;

    font-size: 13px;

}


/* -----------------------------------------
   REMOVE DEFAULT POPUP EXTRA SPACE
----------------------------------------- */

.mapboxgl-popup-content {

    padding: 12px;

}

`;


// Add CSS to page
document.head.appendChild(style);