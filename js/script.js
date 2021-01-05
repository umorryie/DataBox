"use strict";
let fetchingData = [];
const mochaData = fetch(
  "https://pacific-taiga-02700.herokuapp.com/api/databox/data"
)
  .then((res) => res.json())
  .then((data) => {
    renderHTMLTable(data);
    fetchingData = data;
  });

function renderHTMLTable(jsonArray, filteringValue) {
  let tableString = "";
  jsonArray.forEach((jsonObject) => {
    if (filteringValue) {
      if (
        jsonObject.company.toLowerCase().includes(filteringValue) ||
        jsonObject.email.toLowerCase().includes(filteringValue) ||
        jsonObject.id.toString().toLowerCase().includes(filteringValue)
      ) {
        tableString += `
                <table class="columnNamesTable">
                    <tr>
                        <th class="width50 thPaddingID">${jsonObject.id}</th>
                        <th class="thPaddingContext blackTh width200">${jsonObject.company}</th>
                        <th class="thPaddingContext width200">${jsonObject.email}</th>
                    </tr>
                </table>
                <div class="line"></div>
                `;
      }
    } else {
      tableString += `
            <table class="columnNamesTable">
                <tr>
                    <th class="width50 thPaddingID">${jsonObject.id}</th>
                    <th class="thPaddingContext blackTh width200">${jsonObject.company}</th>
                    <th class="thPaddingContext width200">${jsonObject.email}</th>
                </tr>
            </table>
            <div class="line"></div>
            `;
    }
  });

  document.getElementById("renderingTable").innerHTML = tableString;
}

document.getElementById("searchBox").addEventListener("input", (event) => {
  renderHTMLTable(
    fetchingData,
    event.target.value === "" ? null : event.target.value.toLowerCase()
  );
});
