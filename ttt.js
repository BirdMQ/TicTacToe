var ttt = {};

//off we go
$(document).ready(function () {
    'use strict';
    ttt.init();
});


//variables needed
ttt.setup = function(){
    ttt.board = [" ", " ", " ",
                 " ", " ", " ",
                 " ", " ", " "];
    var rand = Math.floor((Math.random()*2)+1);
    if(rand == 1){
        ttt.turn = "Cross";
        $('#slider').addClass("left");
        $('#slider').removeClass("right");
        $('#xBox').addClass("active");
        $('#oBox').removeClass("active");
    } else {
        ttt.turn = "Circle";
        $('#slider').addClass("right");
        $('#slider').removeClass("left");
        $('#oBox').addClass("active");
        $('#xBox').removeClass("active");
    }
    ttt.gameover = false;
    $('#message').html(ttt.turn+" starts");
    ttt.updateBoard();
};
ttt.swap = function () {
    'use strict';
    if (ttt.win()){
        $('#message').html(ttt.turn+" wins! Click to play again");
        ttt.gameover = true;
        if(ttt.turn == "Cross"){
            $('#xScore').html(parseInt($('#xScore').html())+1);
        } else {
            $('#oScore').html(parseInt($('#oScore').html())+1);
        }
    } else if (ttt.draw()){
        $('#message').html("Tie! Click to play again");
        ttt.gameover = true;
    } else if(ttt.turn === "Cross"){
        ttt.turn = "Circle";
        $('#slider').addClass("right");
        $('#slider').removeClass("left");
        $('#oBox').addClass("active");
        $('#xBox').removeClass("active");
        $('#message').html("Circle up next!");
    } else {
        ttt.turn = "Cross";
        $('#slider').addClass("left");
        $('#slider').removeClass("right");
        $('#xBox').addClass("active");
        $('#oBox').removeClass("active");
        $('#message').html("Cross up next!");
    }
};
ttt.move = function (spot) {
    'use strict';
    if(ttt.gameover){
        //console.log("game has ended");
        ttt.setup();
        return false;
    }
    if(spot<0 && spot>8){
        console.log("Invalid move!");
    } else if(ttt.board[spot] === " "){
        var mark;
        if(ttt.turn === "Cross"){mark = "X";} else {mark = "O";}
        ttt.board[spot] = mark;
        ttt.swap();
    } else {
        console.log("Position is taken!");
    }
    ttt.updateBoard();
};
ttt.win = function () {
    'use strict';
    if((ttt.board[0] === ttt.board[1] && ttt.board[1] === ttt.board[2] && ttt.board[2] !== " " )|| 
       (ttt.board[3] === ttt.board[4] && ttt.board[4] === ttt.board[5] && ttt.board[5] !== " " )||
       (ttt.board[6] === ttt.board[7] && ttt.board[7] === ttt.board[8] && ttt.board[8] !== " " )||
       (ttt.board[0] === ttt.board[3] && ttt.board[3] === ttt.board[6] && ttt.board[6] !== " " )||
       (ttt.board[1] === ttt.board[4] && ttt.board[4] === ttt.board[7] && ttt.board[7] !== " " )||
       (ttt.board[2] === ttt.board[5] && ttt.board[5] === ttt.board[8] && ttt.board[8] !== " " )||
       (ttt.board[0] === ttt.board[4] && ttt.board[4] === ttt.board[8] && ttt.board[8] !== " " )||
       (ttt.board[2] === ttt.board[4] && ttt.board[4] === ttt.board[6] && ttt.board[6] !== " " )){
        return true;
    }
    return false;
};
ttt.draw = function() {
    var countOfEmpty = 0;
    for (var i = 0; i < ttt.board.length; i++) {
        if(ttt.board[i] == " "){
            countOfEmpty += 1;
        }
    };
    if(countOfEmpty == 0){
        return true;
    }
    return false;
};

ttt.updateBoard = function() {
    for (var i = 0; i < ttt.board.length; i++) {
        $('#'+i).html(ttt.board[i]);
    };
};

ttt.init = function(){
    //initial setup of variables
    ttt.setup();

    //bind the click events
    $('td').bind("click",function(){
        ttt.move(this.id);
    })
};