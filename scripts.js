var canvas = document.getElementById('birdspace');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('birdspace2');
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('birdspace3');
var ctx3 = canvas3.getContext('2d');

canvas.width = canvas.height *
    (canvas.clientWidth / canvas.clientHeight);
canvas2.width = canvas2.height *
    (canvas2.clientWidth / canvas2.clientHeight);
canvas3.width = canvas3.height *
    (canvas3.clientWidth / canvas3.clientHeight);

ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx2.fillText("Loading...", canvas.width * 0.5, canvas.height * 0.5);

var coordgridsize = 200;


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    ctx3.font = "20px Arial";
    ctx3.fillText("Symbol:", 0, 15);

    let neckRange = document.getElementById("neckRange").value / 100;
    let legRange = document.getElementById("legRange").value / 100;

    document.getElementById("neckspan").innerHTML = neckRange;
    document.getElementById("legspan").innerHTML = legRange;

    drawBird(canvas.width / 2, canvas.height / 2, canvas.width / 200, canvas.height / 200, neckRange, legRange);

    ctx2.drawImage(imgCoord, 0, 0, coordgridsize, coordgridsize, 0, 0, canvas2.width, canvas2.height);



    let symbolsize = 30;
    for (let i = 0; i < symbols.length; i++) {

        ctx2.drawImage(imgChris, symbols[i][0] * coordgridsize, symbols[i][1] * coordgridsize, coordgridsize, coordgridsize, xToCoord(symbolpoints[i][0]) - symbolsize / 2, yToCoord(symbolpoints[i][1]) - symbolsize / 2, symbolsize, symbolsize);

        if (Math.abs(symbolpoints[i][0] - neckRange) < 0.11 && Math.abs(symbolpoints[i][1] - legRange - 0.08) < 0.11) {
            ctx3.drawImage(imgChris, symbols[i][0] * coordgridsize, symbols[i][1] * coordgridsize, coordgridsize, coordgridsize, 0, 0, canvas3.width, canvas3.height);
        }


    }

    ctx2.font = "25px Arial";
    ctx2.strokeStyle = "white";
    ctx2.fillStyle = "red";
    ctx2.textAlign = "center";
    ctx2.strokeText("x", xToCoord(neckRange), yToCoord(legRange));
    ctx2.fillText("x", xToCoord(neckRange), yToCoord(legRange));

}

function xToCoord(x) {
    return (canvas2.width * 0.25 + (canvas2.width * 0.7 * x));
}

function yToCoord(x) {
    return (canvas2.height * 0.1 + canvas2.height * 0.7 * (1 - x));
}

var symbols = [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1]
];
var symbolpoints = [
    [0.6, 0.3],
    [0.1, 0.4],
    [0.8, 0.1],
    [0.9, 0.7],
    [0.5, 0.9],
    [0.4, 0.1]
];


function drawBird(x, y, scalex, scaley, neckscale, legscale) {

    scaley = 0.75 * scaley;
    scalex = 0.75 * scalex;

    neckscale = 0.0 + neckscale * 3.0;
    legscale = 0.2 + legscale * 1.2;

    let drawx = x - (100 * scalex);
    let draww = 200 * scalex;

    let bodyy = y - 52 * scaley; // 30
    let bodyh = 75 * scaley; // 61

    let legy = bodyy + bodyh;
    let legh = (63 * legscale) * scaley; // 30

    let feety = legy + legh;
    let feeth = 14 * scaley;

    let neckh = (14 * neckscale) * scaley;
    let necky = bodyy - neckh;

    let headh = 34 * scaley;
    let heady = necky - headh;

    ctx.drawImage(img, 0, 0, 200, 34, drawx, heady, draww, headh); // head
    ctx.drawImage(img, 0, 34, 200, 14, drawx, necky, draww, neckh); // neck
    ctx.drawImage(img, 0, 48, 200, 75, drawx, bodyy, draww, bodyh); // body
    ctx.drawImage(img, 0, 123, 200, 63, drawx, legy, draww, legh); // legs
    ctx.drawImage(img, 0, 186, 200, 14, drawx, feety, draww, feeth); // feet
}

var RESLOAD = 0;
var RESCOUNTER = 0;

function addResource(path) {
    RESCOUNTER++;
    let img = new Image();
    img.onload = function () {
        loadRes();
    }
    img.src = path;
    return img;
}
function loadRes() {
    if (++RESLOAD >= RESCOUNTER)
        draw();
}

var img = addResource('img/bird.png');
var imgCoord = addResource('img/coord.png');
var imgChris = addResource('img/christmas.png');

document.getElementById("neckRange").oninput = function () {
    draw();
};
document.getElementById("legRange").oninput = function () {
    draw();
};
