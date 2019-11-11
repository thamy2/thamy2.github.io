var width = window.innerWidth,
height = window.innerHeight, 
c = document.getElementById('c'), 
ctx = c.getContext('2d');
c.width = width;
c.height = height;

var mouse = {
    x: 0,
    y: 0
};

var mouseDown = false;

var patterns = [[1], [2], [1, 2], [2, 2], [2, 1, 2], [3, 3], [2, 3, 2], [4, 4], [3, 3, 3], [3, 4, 3]];
var actualPoints = [];
var possiblePoints = [];
var points = [];
var gameEnabled = false;
var lvl = 3;
var best = lvl;


function init(){
    c.addEventListener('mousedown', MouseDown, false);
    c.addEventListener('mouseup', MouseUp, false);
    c.addEventListener('mousemove', MouseMove, false);
    
    prepare();
}

function point(x, y, v){
    this.x = x;
    this.y = y;
    this.value = v;
}

function prepare(){
    possiblePoints = [];
    actualPoints = [];
    points = [];
    for (var i = 0; i < lvl; i++) {
        possiblePoints.push(i + 1);
        actualPoints.push(i + 1);
        

        possiblePoints.sort(function(){
            return 0.5 - Math.random()
        });
    }
    

    pattern = patterns[lvl - 1];
    itemsAdded = 0;
    

    for (i = 0; i < pattern.length; i++) {
        rowItems = pattern[i];
        for (var j = 0; j < rowItems; j++) {
            pointx = (Math.floor(width / 2) + 30) - 80 * j;
            pointy = (Math.floor(height / 2) + 60) - 80 * i;        
            points.push(new point(pointx, pointy, possiblePoints[itemsAdded]));
            itemsAdded++;
        }
    }
    
    gameEnabled = false;
    drawPoints(true);
    setTimeout(function(){
      hidetext();
    }, 2000);
}

function hidetext(){
    drawPoints(false);
    gameEnabled = true;
}

function drawPoints(drawText){
    for (var i = 0; i < points.length; i++) {
        ctx.fillStyle = '#d3d3d3';
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 30, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,105,180)';
        ctx.stroke();
        
        if (drawText) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 20px helvetica';
            ctx.fillText(points[i].value, points[i].x - 6, points[i].y + 6);
        }
    }
}

function MouseMove(e){
    if (e.layerX || e.layerX == 0) {
        mouse.x = e.layerX - c.offsetLeft;
        mouse.y = e.layerY - c.offsetTop;
    }
}

function MouseDown(e){
    if (e.layerX || e.layerX == 0) {
        mouseDown = true;
    }
}

function handlePointClick(point){
    if (point.value == actualPoints[0]) {
        actualPoints.splice(0, 1);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px helvetica';
        ctx.fillText(point.value, point.x - 6, point.y + 6);
        
        if (actualPoints.length == 0) {
            clear();
            if (lvl < patterns.length){
                lvl = lvl + 1;
            }
            
            prepare();
            return;
        }
    } else {
        clear();
        lvl = lvl - 1;
        prepare();    
    } 
}


function clear(){
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
}

function MouseUp(e){
    if (e.layerX || e.layerX == 0) {
        mouseDown = false;
        
        if (gameEnabled) {
            for (var i = 0; i < points.length; i++) {
                var dx = points[i].x - mouse.x;
                var dy = points[i].y - mouse.y;
                sqrDist = Math.sqrt(dx * dx + dy * dy);
                
                if (sqrDist < 30) {
                    handlePointClick(points[i]);
                    return;
                }
            }        
        }
    }
}

init();