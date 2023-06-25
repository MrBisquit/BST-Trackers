var darray = null;
t_enabled = false;

setInterval(async () => {
    darray = Object.values(await (await fetch("/data/")).json());
    updateData();
}, 5000);

window.onload = async () => {
    darray = Object.values(await (await fetch("/data/")).json());
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
        //console.log(`${(date - new Date(darray[i].last_ping))} < ${15} = ${(date - new Date(darray[i].last_ping)) < 15*1000}`);
    }
    document.getElementById("cau").innerHTML = cou;
}