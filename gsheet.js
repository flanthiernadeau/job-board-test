// Load the Google Sheets API
const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";
document.head.appendChild(script);

// Initialize the API and authorize the user
script.onload = function() {
  gapi.load("client", function() {
    gapi.client.init({
      apiKey: "AIzaSyAcAYbFqdiq-NuMPpIUTDPzhu9gLtV7XvY",
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    });
    gapi.client.authorize(function() {
      // Read data from the sheet and display it on the page
      readSheetData();
    });
  });
};

function readSheetData() {
  const spreadsheetId = "1La72SQie8PejaaZyhT5UouxxCvyDqtWZ30ofQz2ZTJg";
  const range = "Sheet1!A1:G19";
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  }).then(function(response) {
    const values = response.result.values;
    if (values.length > 0) {
      // Display the data on the page
      const table = document.createElement("table");
      for (const row of values) {
        const tr = document.createElement("tr");
        for (const cell of row) {
          const td = document.createElement("td");
          td.innerText = cell;
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      document.body.appendChild(table);
    } else {
      console.log("No data found.");
    }
  }, function(response) {
    console.error(response.result.error.message);
  });
}
