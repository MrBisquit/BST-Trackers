const express = require("express");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const crypto = require("crypto");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const platform = require('platform');

app.use(cookieParser());

app.set('views', './pages');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.static(__dirname + '/public', {}));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.get("/", (req, res) => {
    if(!TID_exists(req.cookies._tid)) {
        const tid = crypto.randomUUID();
        let other_data = {
            ip : req.ip,
            // useragent : req.headers["user-agent"], // Keep this just in case the one below stops working
            useragent : platform.parse(req.headers["user-agent"]),
            headers : req.headers,
            queries : req.query,
            params : req.params
        }
        Create_TID(tid, other_data);
        res.cookie("_tid", tid);
    }
    res.render("index.ejs");
});

app.post("/tracking_data/", (req, res) => {
    try {
        let data = {
            data_from : moment(),
            data : req.body,
        }
        console.log(req.body);
        AddTD_TID(req.cookies._tid, data);

        res.json({ success : true, TID : req.cookies._tid});
        return;
    } catch {
        res.json({ success : false, TID : req.cookies._tid});
    }
});

app.get("/dashboard/", (req, res) => {
    res.render("dashboard.ejs");
});

app.get("/dashboard/analytics/", (req, res) => {
    res.render("analytics.ejs");
})

app.get("/dashboard/settings/", (req, res) => {
    res.render("dashboard_settings.ejs");
});

app.get("/dashboard/s/:id/", (req, res) => {
    res.render("dashboard_s.ejs", {id : req.params.id});
});

app.get("/dashboard/s/:id/data/", (req, res) => {
    res.render("dashboard_s_d.ejs", {id : req.params.id});
});

app.get("/data/", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./tracking_ids.json")));
});

app.get("/analytics/", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./statistics.json")));
});

app.get("/config/", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./config.json")));
});

app.post("/config/", (req, res) => {
    fs.writeFileSync("config.json", JSON.stringify(req.body));
    res.json({ success : true });
});

app.post("/remove-all/", (req, res) => {
    let json = JSON.parse(fs.readFileSync("./tracking_ids.json"));

    json = {};

    fs.writeFileSync("./tracking_ids.json", JSON.stringify(json));

    res.jsonp({ success : true });
});

app.get("/data/s/:id", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./tracking_ids.json"))[req.params.id]);
});

app.post("/terminate_session/:id/", (req, res) => {
    let json = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    delete json[req.params.id];
    fs.writeFileSync("./tracking_ids.json", JSON.stringify(json));

    res.jsonp({ success : true });
});

function TID_exists(tid) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    console.log(tids[tid]);
    if(tids[tid] == undefined || tids[tid] == null || tids[tid] == "") {
        return false;
    }
    return true;
}

function Create_TID(tid, other_data) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    let tid_data = {
        tid : tid,
        td : [],
        ti : other_data,
        last_ping : moment(),
        tracking_session_created : moment()
    }
    tids[tid] = tid_data;
    fs.writeFileSync("./tracking_ids.json", JSON.stringify(tids));
}

function AddTD_TID(tid, tracking_data) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    tids[tid].td.push(tracking_data);
    tids[tid].last_ping = moment();
    fs.writeFileSync("./tracking_ids.json", JSON.stringify(tids));
}

function GatherStatistics() {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    var tids_keys = Object.keys(tids);
    var tids_values = Object.values(tids);

    var analytics_all = JSON.parse(fs.readFileSync("./statistics.json"));
    var analytics = {
        os : {},
        browser : {},
        sessions : tids_keys.length,
        active_sessions : 0
    };
    var c = moment();
    var date = new Date();

    for (let i = 0; i < tids_keys.length; i++) {
        if((date - new Date(tids_values[i].last_ping)) < 15*1000) {
            analytics.active_sessions += 1;
        }
        console.log(tids_keys[i]);
        console.log(tids_values[i].ti.useragent);

        if(analytics.os[tids_values[i].ti.useragent.os.family] == undefined) {
            analytics.os[tids_values[i].ti.useragent.os.family] = 1;
        } else {
            analytics.os[tids_values[i].ti.useragent.os.family] += 1;
        }

        if(analytics.browser[tids_values[i].ti.useragent.name] == undefined) {
            analytics.browser[tids_values[i].ti.useragent.name] = 1;
        } else {
            analytics.browser[tids_values[i].ti.useragent.name] += 1;
        }
    }

    analytics_all[c] = analytics;
    fs.writeFileSync("./statistics.json", JSON.stringify(analytics_all));
}

setInterval(() => {
    GatherStatistics();
}, 5000);

app.listen(80);