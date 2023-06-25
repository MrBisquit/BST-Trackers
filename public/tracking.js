let array = [];
let t_enabled = true;
var config = {};

window.onload = async () => {
    config = (await (await fetch("/config/")).json());
}

function AddTrackingData(type, event) {
    if(!t_enabled) return;
    try {
        if(config.trackers[type] == undefined || config.trackers[type] == null) return;
        if(!config.trackers[type]) return;
    } catch {}
    if(localStorage.getItem("_td") != null) {
        array = JSON.parse(localStorage.getItem("_td"));
    }

    /*array.push({
        type : type,
        event : event,
        //location : location,
        //document : document,
        //window : Window
    });*/

    let ev = event;

    const trackingData = {
        // Commonly Used Properties
        type: ev.type,
        //target: ev.target,
        //currentTarget: ev.currentTarget,
        clientX: ev.clientX,
        clientY: ev.clientY,
        offsetX: ev.offsetX,
        offsetY: ev.offsetY,
        pageX: ev.pageX,
        pageY: ev.pageY,
        screenX: ev.screenX,
        screenY: ev.screenY,
        altKey: ev.altKey,
        ctrlKey: ev.ctrlKey,
        shiftKey: ev.shiftKey,
        metaKey: ev.metaKey,
        button: ev.button,
        buttons: ev.buttons,
        timeStamp: ev.timeStamp,
        isTrusted: ev.isTrusted,

        // Less Commonly Used Properties
        bubbles: ev.bubbles,
        cancelable: ev.cancelable,
        composed: ev.composed,
        relatedTarget: ev.relatedTarget,
        movementX: ev.movementX,
        movementY: ev.movementY,
        region: ev.region,

        // Internal Properties (not recommended for direct tracking)
        eventPhase: ev.eventPhase,
        defaultPrevented: ev.defaultPrevented,
        returnValue: ev.returnValue,
        //composedPath: ev.composedPath(),
        //srcElement: ev.srcElement,
        fromElement: ev.fromElement,
        toElement: ev.toElement,
        wheelDelta: ev.wheelDelta,
        wheelDeltaX: ev.wheelDeltaX,
        wheelDeltaY: ev.wheelDeltaY,
        detail: ev.detail,
        key: ev.key,
        code: ev.code,
        charCode: ev.charCode,
        keyCode: ev.keyCode,
        repeat: ev.repeat,
        isComposing: ev.isComposing,
        composed: ev.composed,
        locale: ev.locale,
        // Add more properties as needed
    };

    array.push({
        type : type,
        event_data : trackingData
    });

    //console.log(array);
    /*console.log({
        type : type,
        event : event
    });*/

    localStorage.setItem("_td", JSON.stringify(array));

    //document.getElementById("d").innerHTML = `${array.length} events captured:<br>${JSON.stringify(array)}<br>${array.length} events captured`;
    //console.log(event);
}

function ClearAll() {
    array = [];
    localStorage.setItem("_td", JSON.stringify(array));
}

setInterval(async () => {
    if(!t_enabled) return;
    // Thanks to https://stackoverflow.com/a/29823632/16426057 for this!
    (async () => {
        const rawResponse = await fetch('/tracking_data/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(array)
        });
        const content = await rawResponse.json();
      
        console.log(content);

        if(!content.success) {
            alert("Tracking session was interupted, press OK to restart session.");
            location.reload();
        } else {
            array = [];
        }
      })();

      config = (await (await fetch("/config/")).json());
}, 5000);

/*document.addEventListener("mouseenter", (ev) => {
    AddTrackingData("mouseenter", ev);
});

document.addEventListener("scroll", (ev) => {
    AddTrackingData("scroll", ev);
});

document.addEventListener("DOMContentLoaded", (ev) => {
    AddTrackingData("DOMContentLoaded", ev);
});

document.addEventListener("abort", (ev) => {
    AddTrackingData("abort", ev);
});

document.addEventListener("animationcancel", (ev) => {
    AddTrackingData("animationcancel", ev);
});

document.addEventListener("animationend", (ev) => {
    AddTrackingData("animationend", ev);
});

document.addEventListener("animationiteration", (ev) => {
    AddTrackingData("animationiteration", ev);
});

document.addEventListener("animationstart", (ev) => {
    AddTrackingData("animationstart", ev);
});

document.addEventListener("auxclick", (ev) => {
    AddTrackingData("auxclick", ev);
});

document.addEventListener("beforeinput", (ev) => {
    AddTrackingData("beforeinput", ev);
});

document.addEventListener("blur", (ev) => {
    AddTrackingData("blur", ev);
});

document.addEventListener("cancel", (ev) => {
    AddTrackingData("cancel", ev);
});

document.addEventListener("canplay", (ev) => {
    AddTrackingData("canplay", ev);
});

document.addEventListener("canplaythrough", (ev) => {
    AddTrackingData("canplaythrough", ev);
});

document.addEventListener("change", (ev) => {
    AddTrackingData("change", ev);
});

document.addEventListener("click", (ev) => {
    AddTrackingData("click", ev);
});

document.addEventListener("close", (ev) => {
    AddTrackingData("close", ev);
});

document.addEventListener("compositionend", (ev) => {
    AddTrackingData("compositionend", ev);
});

document.addEventListener("compositionstart", (ev) => {
    AddTrackingData("compositionstart", ev);
});

document.addEventListener("compositionupdate", (ev) => {
    AddTrackingData("compositionupdate", ev);
});

document.addEventListener("contextmenu", (ev) => {
    AddTrackingData("contextmenu", ev);
});

document.addEventListener("copy", (ev) => {
    AddTrackingData("copy", ev);
});

document.addEventListener("cuechange", (ev) => {
    AddTrackingData("cuechange", ev);
});

document.addEventListener("cut", (ev) => {
    AddTrackingData("cut", ev);
});

document.addEventListener("dblclick", (ev) => {
    AddTrackingData("dblclick", ev);
});

document.addEventListener("drag", (ev) => {
    AddTrackingData("drag", ev);
});

document.addEventListener("dragend", (ev) => {
    AddTrackingData("dragend", ev);
});

document.addEventListener("dragenter", (ev) => {
    AddTrackingData("dragenter", ev);
});

document.addEventListener("dragleave", (ev) => {
    AddTrackingData("dragleave", ev);
});

document.addEventListener("dragover", (ev) => {
    AddTrackingData("dragover", ev);
});

document.addEventListener("dragstart", (ev) => {
    AddTrackingData("dragstart", ev);
});

document.addEventListener("drop", (ev) => {
    AddTrackingData("drop", ev);
});

document.addEventListener("durationchange", (ev) => {
    AddTrackingData("durationchange", ev);
});

document.addEventListener("emptied", (ev) => {
    AddTrackingData("emptied", ev);
});

document.addEventListener("ended", (ev) => {
    AddTrackingData("ended", ev);
});

document.addEventListener("error", (ev) => {
    AddTrackingData("error", ev);
});

document.addEventListener("focusin", (ev) => {
    AddTrackingData("focusin", ev);
});

document.addEventListener("focusout", (ev) => {
    AddTrackingData("focusout", ev);
});

document.addEventListener("formdata", (ev) => {
    AddTrackingData("formdata", ev);
});

document.addEventListener("fullscreenchange", (ev) => {
    AddTrackingData("fullscreenchange", ev);
});

document.addEventListener("fullscreenerror", (ev) => {
    AddTrackingData("fullscreenerror", ev);
});

document.addEventListener("gotpointercapture", (ev) => {
    AddTrackingData("gotpointercapture", ev);
});

document.addEventListener("input", (ev) => {
    AddTrackingData("input", ev);
});

document.addEventListener("invalid", (ev) => {
    AddTrackingData("invalid", ev);
});

document.addEventListener("keydown", (ev) => {
    AddTrackingData("keydown", ev);
});

document.addEventListener("keypress", (ev) => {
    AddTrackingData("keypress", ev);
});

document.addEventListener("keyup", (ev) => {
    AddTrackingData("keyup", ev);
});

document.addEventListener("load", (ev) => {
    AddTrackingData("load", ev);
});

document.addEventListener("loadeddata", (ev) => {
    AddTrackingData("loadeddata", ev);
});

document.addEventListener("loadedmetadata", (ev) => {
    AddTrackingData("loadedmetadata", ev);
});

document.addEventListener("loadstart", (ev) => {
    AddTrackingData("loadstart", ev);
});

document.addEventListener("lostpointercapture", (ev) => {
    AddTrackingData("lostpointercapture", ev);
});

document.addEventListener("mousedown", (ev) => {
    AddTrackingData("mousedown", ev);
});*/

document.addEventListener("mouseenter", (ev) => {
    AddTrackingData("mouseenter", ev);
});

document.addEventListener("scroll", (ev) => {
    AddTrackingData("scroll", ev);
});

document.addEventListener("DOMContentLoaded", (ev) => {
    AddTrackingData("DOMContentLoaded", ev);
});

document.addEventListener("abort", (ev) => {
    AddTrackingData("abort", ev);
});

document.addEventListener("animationcancel", (ev) => {
    AddTrackingData("animationcancel", ev);
});

document.addEventListener("animationend", (ev) => {
    AddTrackingData("animationend", ev);
});

document.addEventListener("animationiteration", (ev) => {
    AddTrackingData("animationiteration", ev);
});

document.addEventListener("animationstart", (ev) => {
    AddTrackingData("animationstart", ev);
});

document.addEventListener("auxclick", (ev) => {
    AddTrackingData("auxclick", ev);
});

document.addEventListener("beforeinput", (ev) => {
    AddTrackingData("beforeinput", ev);
});

document.addEventListener("blur", (ev) => {
    AddTrackingData("blur", ev);
});

document.addEventListener("cancel", (ev) => {
    AddTrackingData("cancel", ev);
});

document.addEventListener("canplay", (ev) => {
    AddTrackingData("canplay", ev);
});

document.addEventListener("canplaythrough", (ev) => {
    AddTrackingData("canplaythrough", ev);
});

document.addEventListener("change", (ev) => {
    AddTrackingData("change", ev);
});

document.addEventListener("click", (ev) => {
    AddTrackingData("click", ev);
});

document.addEventListener("close", (ev) => {
    AddTrackingData("close", ev);
});

document.addEventListener("compositionend", (ev) => {
    AddTrackingData("compositionend", ev);
});

document.addEventListener("compositionstart", (ev) => {
    AddTrackingData("compositionstart", ev);
});

document.addEventListener("compositionupdate", (ev) => {
    AddTrackingData("compositionupdate", ev);
});

document.addEventListener("contextmenu", (ev) => {
    AddTrackingData("contextmenu", ev);
});

document.addEventListener("copy", (ev) => {
    AddTrackingData("copy", ev);
});

document.addEventListener("cuechange", (ev) => {
    AddTrackingData("cuechange", ev);
});

document.addEventListener("cut", (ev) => {
    AddTrackingData("cut", ev);
});

document.addEventListener("dblclick", (ev) => {
    AddTrackingData("dblclick", ev);
});

document.addEventListener("drag", (ev) => {
    AddTrackingData("drag", ev);
});

document.addEventListener("dragend", (ev) => {
    AddTrackingData("dragend", ev);
});

document.addEventListener("dragenter", (ev) => {
    AddTrackingData("dragenter", ev);
});

document.addEventListener("dragleave", (ev) => {
    AddTrackingData("dragleave", ev);
});

document.addEventListener("dragover", (ev) => {
    AddTrackingData("dragover", ev);
});

document.addEventListener("dragstart", (ev) => {
    AddTrackingData("dragstart", ev);
});

document.addEventListener("drop", (ev) => {
    AddTrackingData("drop", ev);
});

document.addEventListener("durationchange", (ev) => {
    AddTrackingData("durationchange", ev);
});

document.addEventListener("emptied", (ev) => {
    AddTrackingData("emptied", ev);
});

document.addEventListener("ended", (ev) => {
    AddTrackingData("ended", ev);
});

document.addEventListener("error", (ev) => {
    AddTrackingData("error", ev);
});

document.addEventListener("focusin", (ev) => {
    AddTrackingData("focusin", ev);
});

document.addEventListener("focusout", (ev) => {
    AddTrackingData("focusout", ev);
});

document.addEventListener("formdata", (ev) => {
    AddTrackingData("formdata", ev);
});

document.addEventListener("fullscreenchange", (ev) => {
    AddTrackingData("fullscreenchange", ev);
});

document.addEventListener("fullscreenerror", (ev) => {
    AddTrackingData("fullscreenerror", ev);
});

document.addEventListener("gotpointercapture", (ev) => {
    AddTrackingData("gotpointercapture", ev);
});

document.addEventListener("input", (ev) => {
    AddTrackingData("input", ev);
});

document.addEventListener("invalid", (ev) => {
    AddTrackingData("invalid", ev);
});

document.addEventListener("keydown", (ev) => {
    AddTrackingData("keydown", ev);
});

document.addEventListener("keypress", (ev) => {
    AddTrackingData("keypress", ev);
});

document.addEventListener("keyup", (ev) => {
    AddTrackingData("keyup", ev);
});

document.addEventListener("load", (ev) => {
    AddTrackingData("load", ev);
});

document.addEventListener("loadeddata", (ev) => {
    AddTrackingData("loadeddata", ev);
});

document.addEventListener("loadedmetadata", (ev) => {
    AddTrackingData("loadedmetadata", ev);
});

document.addEventListener("loadstart", (ev) => {
    AddTrackingData("loadstart", ev);
});

document.addEventListener("lostpointercapture", (ev) => {
    AddTrackingData("lostpointercapture", ev);
});

document.addEventListener("mousedown", (ev) => {
    AddTrackingData("mousedown", ev);
});

document.addEventListener("mousemove", (ev) => {
    AddTrackingData("mousemove", ev);
});

document.addEventListener("mouseout", (ev) => {
    AddTrackingData("mouseout", ev);
});

document.addEventListener("mouseover", (ev) => {
    AddTrackingData("mouseover", ev);
});

document.addEventListener("mouseup", (ev) => {
    AddTrackingData("mouseup", ev);
});

document.addEventListener("paste", (ev) => {
    AddTrackingData("paste", ev);
});

document.addEventListener("pause", (ev) => {
    AddTrackingData("pause", ev);
});

document.addEventListener("play", (ev) => {
    AddTrackingData("play", ev);
});

document.addEventListener("playing", (ev) => {
    AddTrackingData("playing", ev);
});

document.addEventListener("pointerlockchange", (ev) => {
    AddTrackingData("pointerlockchange", ev);
});

document.addEventListener("pointerlockerror", (ev) => {
    AddTrackingData("pointerlockerror", ev);
});

document.addEventListener("progress", (ev) => {
    AddTrackingData("progress", ev);
});

document.addEventListener("ratechange", (ev) => {
    AddTrackingData("ratechange", ev);
});

document.addEventListener("reset", (ev) => {
    AddTrackingData("reset", ev);
});

document.addEventListener("resize", (ev) => {
    AddTrackingData("resize", ev);
});

document.addEventListener("search", (ev) => {
    AddTrackingData("search", ev);
});

document.addEventListener("seeked", (ev) => {
    AddTrackingData("seeked", ev);
});

document.addEventListener("seeking", (ev) => {
    AddTrackingData("seeking", ev);
});

document.addEventListener("select", (ev) => {
    AddTrackingData("select", ev);
});

document.addEventListener("selectionchange", (ev) => {
    AddTrackingData("selectionchange", ev);
});

document.addEventListener("selectstart", (ev) => {
    AddTrackingData("selectstart", ev);
});

document.addEventListener("show", (ev) => {
    AddTrackingData("show", ev);
});

document.addEventListener("stalled", (ev) => {
    AddTrackingData("stalled", ev);
});

document.addEventListener("submit", (ev) => {
    AddTrackingData("submit", ev);
});

document.addEventListener("suspend", (ev) => {
    AddTrackingData("suspend", ev);
});

document.addEventListener("timeupdate", (ev) => {
    AddTrackingData("timeupdate", ev);
});

document.addEventListener("toggle", (ev) => {
    AddTrackingData("toggle", ev);
});

document.addEventListener("touchcancel", (ev) => {
    AddTrackingData("touchcancel", ev);
});

document.addEventListener("touchend", (ev) => {
    AddTrackingData("touchend", ev);
});

document.addEventListener("touchmove", (ev) => {
    AddTrackingData("touchmove", ev);
});

document.addEventListener("touchstart", (ev) => {
    AddTrackingData("touchstart", ev);
});

document.addEventListener("transitioncancel", (ev) => {
    AddTrackingData("transitioncancel", ev);
});

document.addEventListener("transitionend", (ev) => {
    AddTrackingData("transitionend", ev);
});

document.addEventListener("transitionrun", (ev) => {
    AddTrackingData("transitionrun", ev);
});

document.addEventListener("transitionstart", (ev) => {
    AddTrackingData("transitionstart", ev);
});

document.addEventListener("volumechange", (ev) => {
    AddTrackingData("volumechange", ev);
});

document.addEventListener("waiting", (ev) => {
    AddTrackingData("waiting", ev);
});

document.addEventListener("wheel", (ev) => {
    AddTrackingData("wheel", ev);
});