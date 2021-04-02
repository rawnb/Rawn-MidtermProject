/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
Code Start
===================== */

//Styles
var styleOne = function(feature) {
  return {color: "transparent"};
};

var styleTwo = function(feature) {
   return {color: "#8FB339"};
};

var styleThree = function(feature) {
  switch (feature.properties.P_DIST) {
    case 'Central': return {color: "#8FB339"};
    case 'Central NE': return {color: "#A3C14E"};
    case 'Lower Far NE': return {color: "#B7CE63"};
    case 'Lower NE': return {color: "#85C099"};
    case 'Lower North':   return {color: "#52B2CF"};
    case 'Lower NW':   return {color: "#7EC4CF"};
    case 'Lower South':   return {color: "#8DB9CF"};
    case 'Lower SW':   return {color: "#95B3CF"};
    case 'N Delaware':   return {color: "#9CADCE"};
    case 'North':   return {color: "#AAB6D3"};
    case 'River Wards':   return {color: "#B7BED8"};
    case 'South':   return {color: "#D1CFE2"};
    case 'University SW':   return {color: "#D2C2D2"};
    case 'Upper Far NE':   return {color: "#D3BCC9"};
    case 'Upper North':   return {color: "#D4AFB9"};
    case 'Upper NW':   return {color: "#A98C9A"};
    case 'West':   return {color: "#7E687B"};
    case 'West Park':   return {color: "#53455C"};
};
}

var styleFour = function(feature) {
  if (feature.properties.VAC_RATE < 1) {
    return {color: "#6E44FF"}
  } else if (feature.properties.VAC_RATE < 5) {
    return {color: "#B892FF"}
  } else if (feature.properties.VAC_RATE < 10) {
    return {color: "#FFC2E2"}
  } else if (feature.properties.VAC_RATE < 50) {
    return {color: "#FF90B3"}
  } else return {color: "#EF7A85"}
  };

//Show Results
var showResults = function() {
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

//Click functions
//Function 1
var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
        console.log(layer.feature.properties.P_DIST);
        showResults();
        map.fitBounds(event.target.getBounds(), {maxZoom: 12})    
  })};
//Function 2
var eachFeatureFunctionTwo = function(layer) {
  layer.on('click', function (event) {
    $('#text').text(`This corridor is in the ${layer.feature.properties.P_DIST} district.`);
    //  switch (layer.feature.properties.P_DIST) {
    //   case 'Central': $('#text').text("This corridor is in the Central district."); 
    //   case 'Central NE': $('#text').text("This corridor is in the Central NE district.");
    //   case 'Lower Far NE': $('#text').text("This corridor is in the Lower Far NE district.");
    //   case 'Lower NE': $('#text').text("This corridor is in the Lower NE district.");
    //   case 'Lower North':  $('#text').text("This corridor is in the Central NE.");
    //   case 'Lower NW':  $('#text').text("This corridor is in the Central NE.");
    //   case 'Lower South':  $('#text').text("This corridor is in the Central NE.");
    //   case 'Lower SW': $('#text').text("This corridor is in the Central NE.");
    //   case 'N Delaware':  $('#text').text("This corridor is in the Central NE.");
    //   case 'North': $('#text').text("This corridor is in the Central NE.");
    //   case 'River Wards': $('#text').text("This corridor is in the Central NE.");
    //   case 'South': $('#text').text("This corridor is in the Central NE.");
    //   case 'University SW': $('#text').text("This corridor is in the Central NE.");
    //   case 'Upper Far NE': $('#text').text("This corridor is in the Central NE.");
    //   case 'Upper North': $('#text').text("This corridor is in the Central NE.");
    //   case 'Upper NW': $('#text').text("This corridor is in the Central NE.");
    //   case 'West': $('#text').text("This corridor is in the Central NE.");
    //   case 'West Park': $('#text').text("This corridor is in the Central NE.");
    //  }
        console.log(layer.feature.properties.P_DIST);
        showResults();
        map.fitBounds(event.target.getBounds(), {maxZoom: 12})
      
  })};
  //Function 3
    var eachFeatureFunctionThree = function(layer) {
  layer.on('click', function (event) {
    rate = layer.feature.properties.VAC_RATE
     $('#text').text("This corridor has a vacancy of "+(layer.feature.properties.VAC_RATE)); 
        console.log(layer.feature.properties.VAC_RATE);
        showResults();
        map.fitBounds(event.target.getBounds(), {maxZoom: 12})
      
  })};
  
//Filter function
var myFilter = function(feature) {
  switch (feature.properties.P_DIST) {
    //case '#VALUE!': return false;
    // case 'MON': return true;
}
};

//Define pages
var data;
var featureGroup;
var page1 = {
  title: "Philly Commercial Corridors", 
  content: "This app visualizes commercial corridors in Philadelphia.",
  text: "Click 'next' to begin.",
  bbox: [[40.03, -75.22], [39.9, -75]],
  style: styleOne
}

var page2 = {
  title: "Corridor Outlines", 
  content: "These are the outlines of commercial corridors.",
  bbox: [[40.03, -75.22], [39.9, -75]],
  style: styleTwo
}

var page3 = {
  title: "Corridor District", 
  content: "These are the districts of each corridor.",
  text: "Click on the map to inspect.",
  bbox: [[40.03, -75.22], [39.9, -75]],
  style: styleThree
}

var page4 = {
  title: "Vacancy Rates", 
  content: "These are the vacancy rates of each corridor.",
  text: "Click on the map to inspect.",
  bbox: [[40.03, -75.22], [39.9, -75]],
  style: styleFour
}
//Define slides
var slides = [
  page1,
  page2,
  page3,
  page4
]

//Change page logic
var currentPage = 0
var nextPage = function() {
  // event handling for proceeding forward in slideshow
  tearDown()
  var nextPage = currentPage + 1
  currentPage = nextPage
  buildPage(slides[nextPage])
}
var prevPage = function() {
  // event handling for going backward in slideshow
  tearDown()
  var prevPage = currentPage - 1
  currentPage = prevPage
  buildPage(slides[prevPage])
}
//Build Page function
var buildPage = function(pageDefinition) {
  // build up a 'slide' given a page definition
 featureGroup = L.geoJson(data, {
      //filter: myFilter,
      style: pageDefinition.style
  }).addTo(map);
  
  if (currentPage === 0) {
  featureGroup.eachLayer(eachFeatureFunction);
  } else if (currentPage === 1) {
    featureGroup.eachLayer(eachFeatureFunction);
  } else if (currentPage === 2) {
    featureGroup.eachLayer(eachFeatureFunctionTwo);
  } else featureGroup.eachLayer(eachFeatureFunctionThree);
  
  //set the title
  $('#title').text(pageDefinition.title)
  //set the content
  $('#content').text(pageDefinition.content)
  //set changeable text
  $('#text').text(pageDefinition.text)
  //move to the bounnding box
  map.flyToBounds(pageDefinition.bbox)

  if (currentPage === 0) {
    $('#prev').prop("disabled", true)
  } else {
    $('#prev').prop("disabled", false)
  }

if (currentPage === slides.length - 1) {
  $('#next').prop("disabled", true)
} else {
  $('#next').prop("disabled", false)
}
}

var tearDown = function() {
  // remove all plotted data in prep for building the page with new filters etc
  if (currentPage == slides.length - 1) {
    $('#next').prop   
  }
  map.removeLayer(featureGroup) 
}

//Import data
$.ajax('https://opendata.arcgis.com/datasets/f43e5f92d34e41249e7a11f269792d11_0.geojson').done(function(json){
  data = json
  data = data.features.map(function(datum) {
    if (_.isNull(datum.properties.VAC_RATE) || _.isNaN(datum.properties.VAC_RATE)) {
      datum.properties.VAC_RATE = 0
    } else {datum.properties.VAC_RATE = Number(_.initial(datum.properties.VAC_RATE).join(""))
    }
    return datum
  })
})
buildPage(slides[currentPage])
//})
$('#next').click(nextPage)
$('#prev').click(prevPage)


