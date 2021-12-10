import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Cars = () => {

    //npm i kaboom
    var GameStart = true;
    var movingLeft = false;
    var movingRight = false;
    var movingUp = false;
    var movingDown = false;
    var speedCar = 8;
    var scoreGame = 0;
    var points = 1;
    var coins = 0;
    var marketVisible = 0;
    var marketFirstTime = 1;
    var MyCar = document.getElementById("TheCar");
    var AppGame = document.getElementById("gameApp");
    var container = document.getElementById("Container");
    var playAgain = document.querySelector(".playAgain");
    var app = document.querySelector(".app");
    var lines = null;
    var newCar = null;
    var newMarket = null;
    var score = document.querySelector(".score");
    const navigate = useNavigate();

    const Start = () => {

        playAgain = document.querySelector(".playAgain")
        app = document.querySelector(".App")
        score = document.querySelector(".score");

        app.classList.remove('hide');
        playAgain.classList.add('hide');
        score.classList.remove('hide');
        scoreGame = 1;
        points = 1;
        coins = 0;
        speedCar = 8;
        GameStart = true;
        AppGame = document.getElementById("gameApp");
        score = document.getElementById("score")

        for (let i = 0; i < 9; i++) {
            let roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines");
            roadLine.style.top = (i * 120) + "px";
            AppGame.appendChild(roadLine);
        }

        for (let i = 0; i < 4; i++) {
            newCar = document.createElement("div");
            newCar.setAttribute("class", "enemy");
            let randomImg = Math.floor(Math.random() * 3);
            if (randomImg === 0) { newCar.classList.add("img1") }
            if (randomImg === 1) { newCar.classList.add("img2") }
            if (randomImg === 2) { newCar.classList.add("img3") }
            newCar.style.top = ((i + 1) * 295) * -1 + "px";
            let x = Math.floor(Math.random() * 475);
            newCar.style.left = x + "px";
            AppGame.appendChild(newCar);
        }
        MyCar = document.createElement("div");
        MyCar.setAttribute("class", "square");
        MyCar.style.left = "210px";
        MyCar.style.top = "608px";
        AppGame.appendChild(MyCar);
        eventhandler()
        PlayGame()
    }
    const MoveEnemyCar = () => {
        let allEnemyCars = document.querySelectorAll(".enemy");
        allEnemyCars.forEach(function (ele) {
            if (parseInt(ele.style.top) > 610) {
                ele.style.top = -608 + "px"
                let enemyx = Math.floor(Math.random() * 475)
                ele.style.left = enemyx + "px"
                ele.classList.remove("img1")
                ele.classList.remove("img2")
                ele.classList.remove("img3")
                let randomImg = Math.floor(Math.random() * 3);

                if (randomImg === 0) { ele.classList.add("img1") }
                if (randomImg === 1) { ele.classList.add("img2") }
                if (randomImg === 2) { ele.classList.add("img3") }
            }
            else
                ele.style.top = parseInt(ele.style.top) + speedCar + "px";
        })
    }
    const eventhandler = () => {
        window.addEventListener('keydown', event => {
            if (event.which === 37) { movingLeft = true; }
            if (event.which === 38) { movingUp = true; }
            if (event.which === 39) { movingRight = true; }
            if (event.which === 40) { movingDown = true; }
        })

        window.addEventListener('keyup', event => {
            movingDown = false;
            movingUp = false;
            movingRight = false;
            movingLeft = false;
        })
    }
    const handleMoving = () => {
        if (movingLeft)
            window.requestAnimationFrame(moveLeft);
        if (movingUp)
            window.requestAnimationFrame(moveUp);
        if (movingDown)
            window.requestAnimationFrame(moveDown);
        if (movingRight)
            window.requestAnimationFrame(moveRight);
    }

    const handelRect = () => {
        let enemies = document.querySelectorAll('.enemy');
        let MyCarRect = MyCar.getBoundingClientRect();
        enemies.forEach(ele => {
            let enemyCarRect = ele.getBoundingClientRect();
            if (!((MyCarRect.bottom < enemyCarRect.top) || (MyCarRect.top > enemyCarRect.bottom) || (MyCarRect.right < enemyCarRect.left) || (MyCarRect.left > enemyCarRect.right))) {
                localStorage.setItem('coins', coins);
                //now we hava the coins at local we need to add it to th db
                saveCoins();
                AppGame.innerHTML = "Game over Your score is :-" + MyCar.scoreGame;
                GameStart = false;
            }
        })
    }

    const handdelScoreGame = () => {
        var score = document.querySelector(".score");
        scoreGame += points;
        if (scoreGame % 500 === 0) {
            console.log("we are increasing the speed")
            points++;
            speedCar += 2;
        }
        coins = parseInt(localStorage.getItem('coins')) + Math.round(scoreGame / 10);
        score.innerHTML = "<br>Score :" + scoreGame + "<br>" + "Coins :" + coins + "<br>" + "Speed :" + speedCar;
    }
    const handleMarket = () => {
        playAgain = document.querySelector(".playAgain")
        app = document.querySelector(".App")
        score = document.querySelector(".score");
        container = document.getElementById("Container");

        if (marketVisible === 0) {

            if (marketFirstTime) {
                newMarket = document.createElement("div")
                let arr = [100, 200, 300]
                for (let i = 0; i <= 2; i++) {
                    newCar = document.createElement("div");
                    newCar.setAttribute("class", "item");
                    let imgname = "img" + (i + 1);
                    newCar.classList.add(imgname)
                    newCar.onclick = function () {
                        if (coins > 100) {
                            console.log('ok');

                        } else {
                            console.log('no');
                        }
                    };
                    newCar.style.top = "200px";
                    newCar.style.left = 10 * i + "%"
                    newCar.innerHTML += "</br></br></br></br></br></br> " + arr[i];
                    newMarket.appendChild(newCar);
                }
                AppGame.appendChild(newMarket);
                marketFirstTime = 0;

            }
            marketVisible = 1;
            newMarket.classList.remove('hide');
            container.appendChild(newMarket);
            app.classList.add('hide');
            score.classList.add('hide');
            playAgain.classList.add('hide');
        }
        else {
            newMarket.classList.add('hide');
            marketVisible = 0;
            app.classList.remove('hide');
            score.classList.remove('hide');
            playAgain.classList.remove('hide');
        }
    }
    const PlayGame = () => {
        moveLines();
        MoveEnemyCar();
        handleMoving();
        handdelScoreGame();
        handelRect();
        if (GameStart)
            window.setTimeout(window.requestAnimationFrame(PlayGame), 3000);
        else {
            app.classList.add('hide');
            playAgain.classList.remove('hide');
        }
    }

    const moveLeft = () => {

        if (parseInt(MyCar.style.left) > 0) {
            MyCar.style.left = parseInt(MyCar.style.left) - speedCar + "px";
        }
    }
    const moveUp = () => {
        if (!(parseInt(MyCar.style.top) < 35))
            MyCar.style.top = parseInt(MyCar.style.top) - speedCar + "px";
    }
    const moveRight = () => {
        if (parseInt(MyCar.style.left) < 421)
            MyCar.style.left = parseInt(MyCar.style.left) + speedCar + "px";
    }
    const moveDown = () => {
        if (parseInt(MyCar.style.top) < (608 - speedCar))
            MyCar.style.top = parseInt(MyCar.style.top) + speedCar + "px";
    }
    window.onload = Start

    const moveLines = () => {
        lines = document.querySelectorAll(".lines");
        lines.forEach(function (item) {
            if (parseInt(item.style.top) > 608)
                item.style.top = "-35px"
            else
                item.style.top = parseInt(item.style.top) + speedCar + "px";
        })
    }
    const handlePlayAgain = () => {
        Start();
    }

    const logOut = () => {
        let path = `/`;
        navigate(path)
    }
    const saveCoins = () => {
        axios.post('https://final-project-backen.herokuapp.com/api/cars/savecoin', {
            coins: parseInt(localStorage.getItem('coins')),
            username: localStorage.getItem('username')
        })
    }
    
    return (
        <div className="Container" id="Container">
            <div className="score">score</div>
            <button className="logOut" onClick={logOut}> logOut </button>
            <button className="playAgain" id="playAgain" onClick={handlePlayAgain}> Start Play </button>
            <button className='market' onClick={handleMarket}>Market</button>

            <div className="App hide" id="gameApp" >
                <div id="enemy"></div>
            </div>
        </div>

    )
}

export default Cars;