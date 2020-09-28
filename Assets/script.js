// This is our custom script file
//document.ready() here?

//variables go here


//function to call AJAX
function getISSPosition(){
    $.ajax({
        type: "GET",
        url: "https://api.wheretheiss.at/v1/satellites/25544?units=kilometers"
    }).then(function(positionResponse) {
        console.log(positionResponse); // check content of response
        //get data from response
        var issAltitude = positionResponse.altitude;
        var issVelocity = positionResponse.velocity;
        var issVisibility = positionResponse.visibility;
        var issLatitude = positionResponse.latitude;
        var issLongitude = positionResponse.longitude;
        // output data
        var issAltDisplay = $("#altISS");
        issAltDisplay.text(`${Math.floor(issAltitude)} kilometres.`);
        //$(document.body).append(issAltDisplay);

        var issCoordsDisplay = $("#coordISS");
        issCoordsDisplay.text(`${issLatitude.toFixed(4)} degrees ${latitudeSide(issLatitude)} and ${issLongitude.toFixed(4)} degrees ${longitudeSide(issLongitude)}.`);
        //$(document.body).append(issCoordsDisplay);

        var issvelocityDisplay = $("#veloISS");
        issvelocityDisplay.text(`${issVelocity.toFixed()} km/h.`);

        var issVisibilityDisplay = $("#dayNightISS");
        if (issVisibility == "daylight"){
            issVisibilityDisplay.text(`The ISS is currently experiencing daylight.`);
            $("#time-icon").removeClass( "moon icon" );
            $("#time-icon").addClass( "sun icon" );
        } else if (issVisibility == "eclipsed") {
            issVisibilityDisplay.text(`The ISS is currently experiencing night-time.`);
            $("#time-icon").removeClass( "sun icon" );
            $("#time-icon").addClass( "moon icon" );
            
        }

        showMap(issLatitude,issLongitude);
    });

    // animate the ISS display info
    $('.ui.accordion').accordion('open', 0);
}

// function to determine if a given longitude represents East or West
function longitudeSide(longitude){
    if (longitude >= 0){
        return "East";
    }
    else if (longitude < 0){
        return "West";
    }
}

//function to determine if a given latitude represents North or South
function latitudeSide(latitude){
    if (latitude >= 0){
        return "North";
    }
    else if (latitude < 0){
        return "South";
    }
}
// function to set the src attribute for the Map iframe
function showMap (lat,long) {

    let apiKey = "AIzaSyDx6Uqqvxa7k-TMC9OTPgIM5a3Cyw5Tv_w";

    let mapURL = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${long}&zoom=5&maptype=satellite`;

    $("#map").attr("src", mapURL)

    // animate map & show
    $("#mapDiv").show("slow");
    
}

// setting the ISS Info text animate as per Semantic UI
$('.ui.accordion')
.accordion();
//function to display coordinates on btn click
$("#getISS").click(getISSPosition);
//testing
//getISSPosition();



/*https://www.google.com/maps/embed/v1/place?key=API_KEY
&q=Space+Needle,Seattle+WA
*/