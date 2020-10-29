var form = document.forms[0];
var data = [];

form.onsubmit = function (event) {
    // The submit event is sent from all buttons, filter for specific ones for each required action
    if (event["submitter"].className == 'add') {
        if (validateForm()) { // Add to list and display list, setup deletion handlers and finally reset form
            console.log('adding record...')

            addRecord();
            displayData();
            setUpAndHandleRemove();
            form.reset();
        }

    } else {
        submitToRemote()
    }

    return false; //false to not handle with the regular POST? (Avoid refreshing page)
}

////// Helper functions - In no logical order, but the ones closer to the bottom came first/////

// Fake submit here
function submitToRemote() {
    // Do the fake ajax transmussion
    // Post on debug
    console.log('transmitting record...' + JSON.stringify(data))
    document.getElementsByTagName("pre")[0].innerHTML = "<p>" + JSON.stringify(data); + "</p>"
    document.getElementsByTagName("pre")[0].style.display = "block"; //Hmm, 
}
//Setup deleting for each of the added delete buttons
function setUpAndHandleRemove() {
    document.querySelectorAll('.remove').forEach(item => {
        item.onclick = function () {
            console.log('meeeh, clicked on:' + item.id);
            data.splice(item.id, 1); //USe splice to rearrange the array, removing the supplied index/id
            displayData(); //Re-paint the data
        }
    })
}

//Build and display html with records.
//Each of the <li> elements has a remove button with an id that corresponds to it's index in the 'data' structure on line 5 above. The buttons are aptly classed as remove to make it easy to find them when setting up the deletion mechanism
function displayData() {
    //PS: Non-perfomant as need to clear then add, refine.But is simpler as 
    var i;
    var listItems = "";
    for (i = 0; i < data.length; i++) {
        listItems += "<li>Age: " + data[i].age + ', Relationship: ' + data[i].rel + ', Smoker: ' + data[i].smoker + ' <button id="' + i + '" class="remove">remove</button>' + "</li>"
    }
    document.getElementsByClassName("household")[0].innerHTML = listItems;
}

//Add data to holder
function addRecord() {
    var record = {
        "age": form["age"].value,
        "rel": form["rel"].value,
        "smoker": form["smoker"].checked
    }
    data.push(record)
}

//Validate age and relationship
function validateForm() {
    let age = form["age"].value;
    let rel = form["rel"].value;
    if (!Number.isInteger(parseInt(age)) || age < 1) {
        alert("Age is required and should be > 0");
        return false;
    }

    if (rel === "") {
        alert("Please select a relationship...");
        return false;
    }
    return true
}
