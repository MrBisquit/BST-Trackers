var darray = null;
t_enabled = false;

setInterval(async () => {
    darray = await (await fetch("/data/s/" + id)).json();
    document.getElementById("myDynamicTable").innerHTML = "";
    addTable();
    document.getElementById("sca").innerHTML = darray.tracking_session_created;
    document.getElementById("lpa").innerHTML = darray.last_ping;
}, 5000);

function addTable() {
    //Thanks to https://stackoverflow.com/a/30616912/16426057 for the base of this
    var myTableDiv = document.getElementById("myDynamicTable");
  
    var table = document.createElement('TABLE');
    table.border = '1';
    table.style.width = "100%";
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var atr = document.createElement("tr");
    var ac1 = document.createElement("td");
    ac1.innerHTML = "Action taken";
    var ac2 = document.createElement("td");
    ac2.innerHTML = "Event JSON";
    atr.appendChild(ac1);
    atr.appendChild(ac2);
    tableBody.appendChild(atr);

    for (let i = 0; i < darray.td.length; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        var td = document.createElement("td");
        td.innerHTML = `<b>Data from ${darray.td[i].data_from}</b>`;
        tr.appendChild(td);

        for (let j = 0; j < darray.td[i].data.length; j++) {
            var tra = document.createElement("tr");
            tableBody.appendChild(tra);
            var tdc1 = document.createElement("td");
            tdc1.innerHTML = darray.td[i].data[j].type;
            var tdc2 = document.createElement("td");
            tdc2.innerHTML = JSON.stringify(darray.td[i].data[j].event);
            tra.appendChild(tdc1);
            tra.appendChild(tdc2);
            //console.log(tra);
        }
    }

    myTableDiv.appendChild(table);
}

window.onload = async () => {
    darray = await (await fetch("/data/s/" + id)).json();
    addTable();
    document.getElementById("sca").innerHTML = darray.tracking_session_created;
    document.getElementById("lpa").innerHTML = darray.last_ping;
}

function terminateSession() {
    (async () => {
        const rawResponse = await fetch('/terminate_session/' + id, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
    location = "/dashboard/";
}