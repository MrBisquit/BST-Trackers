var config = null;
t_enabled = false;

window.onload = async () => {
    config = (await (await fetch("/config/")).json());
    loadSettings();
}

function loadSettings() {
    var keys = Object.keys(config.trackers);
    var values = Object.values(config.trackers);
    var trackers = document.getElementById("trackers");
    trackers.innerHTML = "";
    for (let i = 0; i < keys.length; i++) {
        var tracker = document.createElement("div");
        //var br = document.createElement("br");
        trackers.appendChild(tracker);
        //tracker.appendChild(br);

        var tracker_text = document.createElement("span");
        tracker_text.innerHTML = keys[i] + "&nbsp;";
        tracker.appendChild(tracker_text);
        var tracker_cb = document.createElement("input");
        tracker_cb.type = "checkbox";
        tracker_cb.checked = values[i];
        tracker_cb.id = keys[i];
        //tracker_cb.onclick = `changeSetting(${keys[i]});`;
        tracker_cb.onclick = () => {
            changeSetting(keys[i]);
        }
        tracker.appendChild(tracker_cb);
    }
}

function saveSettings() {
    (async () => {
        const rawResponse = await fetch('/config/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(config)
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
}

function changeSetting(id) {
    //config.trackers[id] = document.getElementById(id).checked;
    config.trackers[id] = !config.trackers[id];
    loadSettings();
}

function enableAll() {
    var keys = Object.keys(config.trackers);
    for (let i = 0; i < keys.length; i++) {
        config.trackers[keys[i]] = true;
    }
    loadSettings();
}

function disableAll() {
    var keys = Object.keys(config.trackers);
    for (let i = 0; i < keys.length; i++) {
        config.trackers[keys[i]] = false;
    }
    loadSettings();
}