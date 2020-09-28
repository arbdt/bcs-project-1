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

        var issCoordsDisplay = $("#coordISS");
        issCoordsDisplay.text(`${issLatitude.toFixed(4)} degrees ${latitudeSide(issLatitude)} and ${issLongitude.toFixed(4)} degrees ${longitudeSide(issLongitude)}.`);

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
        getISSCrew(); // call crew function

        showMap(issLatitude,issLongitude); // call map function
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

// function to get crew number and names from open-notify.org
function getISSCrew(){
    $.getJSON('http://api.open-notify.org/astros.json', function(data) {
        console.log(data);
        let issCrewNum = 0;
        let issCrewNameList = [];
        let issCrewNameString = "";
        for (var p = 0; p < data.number; p++){
            if (data.people[p].craft = "ISS"){
                issCrewNameList.push(data.people[p].name);
                issCrewNum += 1;
            }
        }
        //display data on page
        $("#crewNumISS").text(issCrewNum);
        for (var c = 0; c < issCrewNum-1; c++){
            issCrewNameString += `${issCrewNameList[c]}, `; // add comma after all but last name in set
        }
        issCrewNameString += `${issCrewNameList[issCrewNum-1]}`; //add last name is set
        $("#crewNamesISS").text(issCrewNameString);
    });
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

/*https://www.google.com/maps/embed/v1/place?key=API_KEY
&q=Space+Needle,Seattle+WA
*/