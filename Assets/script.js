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
        var issLatitude = positionResponse.latitude;
        var issLongitude = positionResponse.longitude;
        // output data
        var issAltDisplay = $("<p>");
        issAltDisplay.text(`The altitude of the ISS is: ${Math.floor(issAltitude)} kilometres.`);
        $(document.body).append(issAltDisplay);

        var issCoordsDisplay = $("<p>");
        issCoordsDisplay.text(`The coordinates of the ISS are: ${issLongitude} degrees ${longitudeSide(issLongitude)} and ${issLatitude} degrees ${latitudeSide(issLatitude)}.`);
        $(document.body).append(issCoordsDisplay);
    });
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

//testing
getISSPosition();