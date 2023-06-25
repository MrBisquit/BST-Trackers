var darray = null;
t_enabled = false;

setInterval(async () => {
    darray = Object.values(await (await fetch("/data/")).json());
    document.getElementById("myDynamicTable").innerHTML = "";
    addTable();
}, 5000);

function addTable() {
    //Thanks to https://stackoverflow.com/a/30616912/16426057 for the base of this
    var myTableDiv = document.getElementById("myDynamicTable");
    var date = new Date();
  
    var table = document.createElement('TABLE');
    table.border = '1';
    table.style.width = "100%";
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var atr = document.createElement("tr");
    var ac1 = document.createElement("td");
    ac1.innerHTML = "Session ID";
    var ac2 = document.createElement("td");
    ac2.innerHTML = "Session created at";
    var ac3 = document.createElement("td");
    ac3.innerHTML = "Last ping at";
    var ac4 = document.createElement("td");
    ac4.innerHTML = "Active";
    atr.appendChild(ac1);
    atr.appendChild(ac2);
    atr.appendChild(ac3);
    atr.appendChild(ac4);
    tableBody.appendChild(atr);
  
    for (var i = 0; i < darray.length; i++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);
      var c1 = document.createElement("td");
      var c1l = document.createElement("a");
      c1l.innerHTML = darray[i].tid;
      c1l.href = `/dashboard/s/${darray[i].tid}`;
      c1.appendChild(c1l);
      tr.appendChild(c1);
      
      var c2 = document.createElement("td");
      c2.innerHTML = darray[i].tracking_session_created;
      tr.appendChild(c2);

      var c3 = document.createElement("td");
      c3.innerHTML = darray[i].last_ping;
      tr.appendChild(c3);

      var c4 = document.createElement("td");
      if((date - new Date(darray[i].last_ping)) < 15*1000) {
        c4.innerHTML = "Active";
        tr.style.backgroundColor = "Green";
        tr.style.color = "white";
      } else {
        c4.innerHTML = "Inactive";
      }
      tr.appendChild(c4);
  
      /*for (var j = 0; j < 4; j++) {
        var td = document.createElement('TD');
        td.width = '75';
        td.appendChild(document.createTextNode("Cell " + i + "," + j));
        tr.appendChild(td);
      }*/
    }
    myTableDiv.appendChild(table);
}

window.onload = async () => {
    darray = Object.values(await (await fetch("/data/")).json());
    addTable();
}

function OpenSettings() {
    location = "/dashboard/settings/";
}

function removeAll() {
    (async () => {
        const rawResponse = await fetch('/remove-all/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          //body: JSON.stringify(config)
        });
        const content = await rawResponse.json();
      
        console.log(content);

        darray = [];
      })();
}

function openLiveAnalytics() {
    location = "/dashboard/analytics/";
}