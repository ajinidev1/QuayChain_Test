const API_ENDPOINT =
  "https://hfkurr2544.execute-api.us-west-2.amazonaws.com/status";

// complete the function to retrieve and return an array of objects
function fetch_data() {
  var headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  fetch(API_ENDPOINT, {
    method: "GET",
    headers: headers,
  })
  .then(response => response.json())
  .then(data => populate_cards(data?.Items ?? []))
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });


}

// complete the function and return a card element
// from each object in the array from the previous function
// only return the created object (do not append to HTML page)
function create_card(obj) {
  var child = document.createElement("div");
  child.className = "custom-card col-3";
  var data = document.createElement("div");
  data.className = "card-data";
  data.innerHTML = obj.id;
  var date = document.createElement("p");
  date.className = "date";
  date.innerText = obj.timestamp;
  data.appendChild(date);
  child.appendChild(data);

  return child;
}

// Using the array returned from fetch_data, create a card and append it to
// the card-container div on the HTML page
function populate_cards(obj_array) {
  var parent = document.getElementsByClassName("card-container");
  if (parent.length > 0) {
    var row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < obj_array.length; i++) {
      row.appendChild(create_card(obj_array[i]));
    }
    parent[0].appendChild(row);
  }
}


fetch_data();
