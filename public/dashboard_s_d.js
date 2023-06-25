var darray = null;
t_enabled = false;

setInterval(async () => {
    darray = await (await fetch("/data/s/" + id)).json();
    document.getElementById("myDynamicTablea").innerHTML = "";
    document.getElementById("myDynamicTableb").innerHTML = "";
    document.getElementById("myDynamicTablec").innerHTML = "";
    addTablea();
    addTableb();
    addTablec();
    document.getElementById("sca").innerHTML = darray.tracking_session_created;
    document.getElementById("lpa").innerHTML = darray.last_ping;
    document.getElementById("ip").innerHTML = darray.ti.ip;
}, 5000);

function addTablea() {
    //Thanks to https://stackoverflow.com/a/30616912/16426057 for the base of this
    var myTableDiv = document.getElementById("myDynamicTablea");
  
    var table = document.createElement('TABLE');
    table.border = '1';
    table.style.width = "100%";
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var atr = document.createElement("tr");
    var ac1 = document.createElement("td");
    ac1.innerHTML = "Header";
    var ac2 = document.createElement("td");
    ac2.innerHTML = "Value";
    atr.appendChild(ac1);
    atr.appendChild(ac2);
    tableBody.appendChild(atr);

    var headers = Object.keys(darray.ti.headers);
    var headers_value = Object.values(darray.ti.headers);

    for (let i = 0; i < headers.length; i++) {
        var tra = document.createElement("tr");
        tableBody.appendChild(tra);
        var tdc1 = document.createElement("td");
        tdc1.innerHTML = headers[i];
        var tdc2 = document.createElement("td");
        tdc2.innerHTML = headers_value[i];
        tra.appendChild(tdc1);
        tra.appendChild(tdc2);
        //console.log(tra);
    }

    myTableDiv.appendChild(table);
}

function addTableb() {
    //Thanks to https://stackoverflow.com/a/30616912/16426057 for the base of this
    var myTableDiv = document.getElementById("myDynamicTableb");
  
    var table = document.createElement('TABLE');
    table.border = '1';
    table.style.width = "100%";
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var atr = document.createElement("tr");
    var ac1 = document.createElement("td");
    ac1.innerHTML = "Query";
    var ac2 = document.createElement("td");
    ac2.innerHTML = "Value";
    atr.appendChild(ac1);
    atr.appendChild(ac2);
    tableBody.appendChild(atr);

    var headers = Object.keys(darray.ti.queries);
    var headers_value = Object.values(darray.ti.queries);

    for (let i = 0; i < headers.length; i++) {
        var tra = document.createElement("tr");
        tableBody.appendChild(tra);
        var tdc1 = document.createElement("td");
        tdc1.innerHTML = headers[i];
        var tdc2 = document.createElement("td");
        tdc2.innerHTML = headers_value[i];
        tra.appendChild(tdc1);
        tra.appendChild(tdc2);
        //console.log(tra);
    }

    myTableDiv.appendChild(table);
}

function addTablec() {
    //Thanks to https://stackoverflow.com/a/30616912/16426057 for the base of this
    var myTableDiv = document.getElementById("myDynamicTablec");
  
    var table = document.createElement('TABLE');
    table.border = '1';
    table.style.width = "100%";
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    var atr = document.createElement("tr");
    var ac1 = document.createElement("td");
    ac1.innerHTML = "Parameter";
    var ac2 = document.createElement("td");
    ac2.innerHTML = "Value";
    atr.appendChild(ac1);
    atr.appendChild(ac2);
    tableBody.appendChild(atr);

    var headers = Object.keys(darray.ti.params);
    var headers_value = Object.values(darray.ti.params);

    for (let i = 0; i < headers.length; i++) {
        var tra = document.createElement("tr");
        tableBody.appendChild(tra);
        var tdc1 = document.createElement("td");
        tdc1.innerHTML = headers[i];
        var tdc2 = document.createElement("td");
        tdc2.innerHTML = headers_value[i];
        tra.appendChild(tdc1);
        tra.appendChild(tdc2);
        //console.log(tra);
    }

    myTableDiv.appendChild(table);
}

window.onload = async () => {
    darray = await (await fetch("/data/s/" + id)).json();
    addTablea();
    addTableb();
    addTablec();
    document.getElementById("sca").innerHTML = darray.tracking_session_created;
    document.getElementById("lpa").innerHTML = darray.last_ping;
    document.getElementById("ip").innerHTML = darray.ti.ip;
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

function viewMoreData() {
    location = `/dashboard/s/${id}/data`;
}