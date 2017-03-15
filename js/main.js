$(document).ready(init);

/*---------->> MENU <<----------*/

var currentSection = null;

function init() {
    currentSection = $('#saludo');
    $('#btn-saludo').click(onClickBtnSaludo);
    $('#btn-nombres').click(onClickBtnNombre);
    //gotoSection('juego');
}

function onClickBtnSaludo() {
    gotoSection('nombres');
}

function onClickBtnNombre() {
    gotoSection('juego');
}

function gotoSection(_identificadorDeSeccion) {
    currentSection.removeClass('visible');
    var nextSection = $('#' + _identificadorDeSeccion);

    nextSection.addClass('visible');
    currentSection = nextSection;
}


/*---------->> JUEGO CANVAS <<----------*/

var player = 1;
var tableLine = "#ff6565";

var canvas = document.getElementById('tablero');
var context = canvas.getContext('2d');

var canvasSize = 480;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);


/*----- Dibujar Lineas de Tablero -----*/

function drawLines(lineWidth, strokeStyle) {
    var lineStart = 5;
    var lineLenght = canvasSize - 5;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = strokeStyle;
    context.beginPath();

    for (var y = 1; y <= 2; y++) {
        context.moveTo(lineStart, y * sectionSize);
        context.lineTo(lineLenght, y * sectionSize);
        //console.log(lineLenght+'- y '+y*sectionSize)
    }

    for (var x = 1; x <= 2; x++) {
        context.moveTo(x * sectionSize, lineStart);
        context.lineTo(x * sectionSize, lineLenght);
    }

    context.stroke();
}

drawLines(10, tableLine);

/*----- Iniciar -----*/

function getInitialBoard(defaultValue) {
    var board = [];

    for (var x = 0; x < 3; x++) {
        board.push([]);

        for (var y = 0; y < 3; y++) {
            board[x].push(defaultValue);
        }
    }

    return board;
}

var board = getInitialBoard("");


function clearPlayingArea(xCordinate, yCordinate) {
    context.fillStyle = "rgba(250, 130, 130, 0.6)";
    context.fillRect(xCordinate, yCordinate, sectionSize, sectionSize);
    console.log(xCordinate, yCordinate);

    /*var position = [[{x: 0,y: 0}, {x: 160,y: 0}, {x: 320,y: 0}],
                    [{x: 0,y: 160}, {x: 160,y: 160}, {x: 320,y: 160}],
                    [{x: 0,y: 320}, {x: 160,y: 320}, {x: 320,y: 320}]
                   ];*/

    //console.log(position[0]["1"]);

    /*var position1 = (0,0);
    var position2 = (160,0);
    var position3 = (320,0);
    var position4 = (0,160);
    var position5 = (160,160);
    var position6 = (320,160);
    var position7 = (0,320);
    var position8 = (160,320);
    var position9 = (320,320);*/

    //console.log(position[0]["2"].x,position[0]["2"].y)
    winner(xCordinate, yCordinate);
}


/*----- Dibujar Fichas -----*/

function drawO(xCordinate, yCordinate) {
    var halfSectionSize = (0.5 * sectionSize);
    var centerX = xCordinate + halfSectionSize;
    var centerY = yCordinate + halfSectionSize;
    var radius = (sectionSize - 100) / 2;
    var startAngle = 0 * Math.PI;
    var endAngle = 2 * Math.PI;

    context.lineWidth = 10;
    context.strokeStyle = "#2555f2";
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.stroke();
}

function drawX(xCordinate, yCordinate) {
    context.strokeStyle = "#36ef68";

    context.beginPath();

    var offset = 50;
    context.moveTo(xCordinate + offset, yCordinate + offset);
    context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

    context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
    context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

    context.stroke();
}

/*----- Agregar fichas -----*/

function addPlayingPiece(mouse) {
    var xCordinate;
    var yCordinate;

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            xCordinate = x * sectionSize;
            yCordinate = y * sectionSize;

            if (
                mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
                mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
            ) {
                clearPlayingArea(xCordinate, yCordinate);
                //console.log('x '+xCordinate + ' y '+yCordinate);

                if (player === 1) {
                    drawX(xCordinate, yCordinate);
                } else {
                    drawO(xCordinate, yCordinate);
                }
            }
        }
    }
}

/*----- Coordenadas Mouse -----*/

function getCanvasMousePosition(event) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

canvas.addEventListener('mouseup', function (event) {
    if (player === 1) {
        player = 2;
    } else {
        player = 1;
    }

    var canvasMousePosition = getCanvasMousePosition(event);
    addPlayingPiece(canvasMousePosition);
    drawLines(10, tableLine);
    //console.log(player);
});

/*----- Jugadas Ganadoras -----*/

function winner(xCordinate, yCordinate){
    var x,y,positionX=[],positionY=[],ex=[];
    for (var i=0;i<3;i++){
        x = i*sectionSize;
        y = i*sectionSize;
        positionX.push(x);
        positionY.push(y);
    }
    var position = [[{x: positionX[0],y: positionY[0], player:player}, {x: positionX[1],y: positionY[0],player:player}, {x: positionX[2],y: positionY[0],player:player}],
                    [{x: positionX[0],y: positionY[1],player:player}, {x: positionX[1],y: positionY[1],player:player}, {x: positionX[2],y: positionY[1],player:player}],
                    [{x: positionX[0],y: positionY[2],player:player}, {x: positionX[1],y: positionY[2],player:player}, {x: positionX[2],y: positionY[2],player:player}]
                   ];
    console.log(position);
    if(player==1){
        if(position[0]["0"].player === position[0]["1"].player){
        console.log('gano: '+player);
    }
    }
}