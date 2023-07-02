var darray = null;
var analytics = null;
t_enabled = false;

setInterval(async () => {
    darray = Object.values(await (await fetch("/data/")).json());
    analytics = await (await fetch("/analytics/")).json();
    updateData();
}, 5000);

window.onload = async () => {
    darray = Object.values(await (await fetch("/data/")).json());
    analytics = await (await fetch("/analytics/")).json();
    updateData();
}

function updateData() {
    document.getElementById("cas").innerHTML = darray.length;
    var cou = 0;
    var date = new Date();
    for (let i = 0; i < darray.length; i++) {
        if((date - new Date(darray[i].last_ping)) < 15*1000) {
            cou += 1;
        }
    }
    document.getElementById("cau").innerHTML = cou;

    var tmp = Object.values(analytics);
    var current_analytics = tmp[tmp.length - 1];

    var data = [{
        values: Object.values(current_analytics.os),
        labels: Object.keys(current_analytics.os),
        type: 'pie'
    }];
      
    var layout = {
        height: 400,
        width: 500
    };
      
    Plotly.newPlot('usersOS', data, layout);

    var data = [{
        values: Object.values(current_analytics.browser),
        labels: Object.keys(current_analytics.browser),
        type: 'pie'
    }];
      
    var layout = {
        height: 400,
        width: 500
    };
      
    Plotly.newPlot('usersBrowser', data, layout);

    var currently_active_array = [];
    var currently_known_array = [];
    for (let i = 0; i < tmp.length; i++) {
        currently_active_array.push(tmp[i].active_sessions);
        currently_known_array.push(tmp[i].sessions);
    }

    var trace1 = {
        x: Object.keys(analytics),
        y: currently_active_array,
        type: 'scatter',
        name : "Currently active sessions"
    };
      
    var trace2 = {
        x: Object.keys(analytics),
        y: currently_known_array,
        type: 'scatter',
        name : "Current number of sessions"
    };
      
    var data = [trace1, trace2];
      
    Plotly.newPlot('usersSessions', data);
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