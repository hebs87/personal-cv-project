//Maps JavaScript API key
//This can be removed once we have pasted the relevant script tags for the API and pasted our API key into it
//var APIKey = AIzaSyAOZ89GqQRsSWfEENTddiSDnxUpQ-ne9Uo;

//FUNCTION TO INVOKE initMap PARAMETER AND RENDER MAP - ALL CODE FOR THE MAP GOES IN HERE
function initMap() {
    //create new map object - google.maps.Map() is a map object that is provided by Google Maps API
    //then we use the document.getElementByID() method to to retrieve the div with the ID of "map", which is where our map will be rendered
    var map = new google.maps.Map(document.getElementById("map"), {
        //zoom parameter determines the initial zoom of the map
        zoom: 3,
        //then set our coordinates
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });
    
    //ADD MARKERS TO MAP
    //create a var with a string of alphabet letters, which will appear as the markers
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //create an array for locations - the array will contain set of objects; objects will contain a lattitude and longitusde of the places visited
    var locations = [
        {lat: 40.785091, lng: -73.968285},
        {lat: 41.084045, lng: -73.874245},
        {lat: 40.754932, lng: -73.984016}
    ];
    //iterate through array and create new marker that has the label from our string - the locations.map() method is built in JS, NOT google maps
    //map method works similar to forEach() function, but difference is it returns ARRAY with results of looping through each item in locations array
    //it take up to 3 arguments (2 here) - location - value of where we are in the array as we're looping through, i - index number
    var markers = locations.map(function(location, i) {
        //return new google.maps.Marker() object which will have position value and label
        return new google.maps.Marker({
            position: location,
            //we want to get one of the labels out of our string and the % operator ensures that, if more than 26 locations, it loops around to start of string (Z to A)
            label: labels[i % labels.length]
        });
    });
    
    // Add a marker clusterer to manage the markers (from API documentation)
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}