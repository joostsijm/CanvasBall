$(function () {
    //libary
    var speed;
    var score;
    var lifes;

    //movement
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var ctx = $('#canvas')[0].getContext("2d");

    var y;
    var x;

    // Paddle
    var paddleh = 10;
    var paddlew = 125;
    var paddlex;

    var loop;

    function start() {
        score = 0;
        speed = 2;
        lifes = 3;

        //movement
        y = 0;
        x = width / 2;

        // Paddle
        paddlex = width / 2 - paddlew / 2;
    }

    // Keyboard
    rightDown = false;
    leftDown = false;

    // audio
    var AudioBounce = new Audio('bounce.mp3');
    var AudioFall = new Audio('meh.mp3');

    // zet rightDown of leftDown
    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    // als toetsen up worden
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }

    // functies aanroepen
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, width, height);
        writeScore();
        writeLife();
    }

    function RandomX() {
        return Math.floor((Math.random() * width) + 1);
    }

    function paddle() {
        if (rightDown && paddlex <= $("#canvas").width() - paddlew) paddlex += 5;
        else if (leftDown && paddlex >= 0) paddlex -= 5;
        rect(paddlex, height - paddleh, paddlew, paddleh);
    }

    function init() {
        loop = setInterval(draw, 1);
    }

    function PlayAudio(i) {
        if (i == 1) {
            if (AudioBounce.duration > 0 && !AudioBounce.paused) AudioBounce.currentTime = 0;
            else AudioBounce.play();
        }
        else if (i == 0) {
            if (AudioFall.duration > 0 && !AudioFall.paused) AudioFall.currentTime = 0;
            else AudioFall.play();
        }
    }

    function UpdateScore(i) {
        if (i == "min") score--;
        else if (i == "plus") score++;
    }

    function writeScore() {
        $('#score').text(score);
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "left";
        ctx.fillText("Score:" + score, 2, 30);
    }
    function writeLife() {
        $('#score').text(score);
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "left";
        ctx.fillText("Lifes:" + lifes, 2, 60);
    }

    function game() {
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText("GameOver", canvas.width / 2, canvas.height / 2);
    }

    function LostLife() {
        lifes--;
        $('#Lifes').text(lifes);
        if (lifes <= 0) {
            clearInterval(loop);
            draw();
            game();
        }
    }

    // Libery End

    // teken functie
    function draw() {

        // Teken Items
        clear();
        circle(x, y, 10);
        paddle();

        // Onder de box
        if (y + speed > height) {

            // raakt de paddle
            if (x > paddlex && x < paddlex + paddlew) {
                speed = -speed;
                UpdateScore("plus");
                PlayAudio(1);
            }

                // mist de paddle
            else {
                y = 0;
                speed = speed * 0.7;
                x = RandomX();
                UpdateScore("min");
                LostLife();
                PlayAudio(0);
            }
        }

            // Boven de box
        else if (y + speed < -1) {
            y = 0;
            x = RandomX();
            speed = -speed / 0.9;
        }
        y += speed;
    }

    $("#startbutton").click(function (event) {
        start();
        init();
    })

});
