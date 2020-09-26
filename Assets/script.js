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
        var issAltDisplay = $("#altISS");
        issAltDisplay.text(`${Math.floor(issAltitude)} kilometres.`);
        //$(document.body).append(issAltDisplay);

        var issCoordsDisplay = $("#coordISS");
        issCoordsDisplay.text(`${issLongitude} degrees ${longitudeSide(issLongitude)} and ${issLatitude} degrees ${latitudeSide(issLatitude)}.`);
        //$(document.body).append(issCoordsDisplay);

    });

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

$('.ui.accordion')
.accordion();
//function to display coordinates on btn click
$("#getISS").click(getISSPosition);
//testing
//getISSPosition();