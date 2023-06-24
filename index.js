const express = require("express");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const crypto = require("crypto");
const moment = require("moment");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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
        Create_TID(tid);
        res.cookie("_tid", tid);
    }
    res.render("index.ejs");
});

app.post("/tracking_data/", (req, res) => {
    let data = {
        data_from : moment(),
        data : req.body
    }
    console.log(req.body);
    AddTD_TID(req.cookies._tid, data);

    res.json({ success : true, TID : req.cookies._tid});
});

app.get("/dashboard/", (req, res) => {
    res.render("dashboard.ejs");
});

app.get("/dashboard/settings/", (req, res) => {
    res.render("dashboard_settings.ejs");
});

app.get("/dashboard/s/:id/", (req, res) => {
    res.render("dashboard_s.ejs", {id : req.params.id});
});

app.get("/data/", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./tracking_ids.json")));
});

app.get("/config/", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./config.json")));
});

app.post("/config/", (req, res) => {
    fs.writeFileSync("config.json", JSON.stringify(req.body));
    res.json({ success : true });
});

app.get("/data/s/:id", (req, res) => {
    res.jsonp(JSON.parse(fs.readFileSync("./tracking_ids.json"))[req.params.id]);
});

function TID_exists(tid) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    console.log(tids[tid]);
    if(tids[tid] == undefined || tids[tid] == null || tids[tid] == "") {
        return false;
    }
    return true;
}

function Create_TID(tid) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    let tid_data = {
        tid : tid,
        td : [],
        ti : {},
        last_ping : moment(),
        tracking_session_created : moment()
    }
    tids[tid] = tid_data;
    //console.log(tids);
    fs.writeFileSync("./tracking_ids.json", JSON.stringify(tids));
}

function AddTD_TID(tid, tracking_data) {
    let tids = JSON.parse(fs.readFileSync("./tracking_ids.json"));
    //console.log(tids);
    //console.log(tid);
    tids[tid].td.push(tracking_data);
    tids[tid].last_ping = moment();
    fs.writeFileSync("./tracking_ids.json", JSON.stringify(tids));
}

app.listen(80);