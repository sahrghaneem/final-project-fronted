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
    var upGradeVisible = 0;
    var upGradeFirstTime = 1;
    var MyCar = document.getElementById("TheCar");
    var AppGame = document.getElementById("gameApp");
    var container = document.getElementById("Container");
    var playAgain = document.querySelector(".playAgain");
    var upGradecar=document.querySelector(".upGradecar")
    var app = document.querySelector(".app");
    var lines = null;
    var newCar = null;
    var garage = null;
    var gameOverMessage = document.querySelector(".gameOverPara");
    var score = document.querySelector(".score");
    var logO=document.querySelector(".logOut")
    const navigate = useNavigate();

    const Start = () => {

        playAgain = document.querySelector(".playAgain")
        app = document.querySelector(".App")
        score = document.querySelector(".score");
        logO=document.querySelector(".logOut")
        upGradecar=document.querySelector(".upGradecar")
        app.classList.remove('hide');
        playAgain.classList.add('hide');
        logO.classList.add('hide');
        upGradecar.classList.add('hide')

        score.classList.remove('hide');
        scoreGame = 1;
        points = 1;
        coins = 0;
        speedCar = 8;
        GameStart = true;
        AppGame = document.getElementById("gameApp");
        score = document.getElementById("score")

        for (let i = 0; i < 9; i++) {// creating lines
            let roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines");
            roadLine.style.top = (i * 120) + "px";
            AppGame.appendChild(roadLine);
        }

        for (let i = 0; i < 4; i++) {// creating enemies
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
        MyCar.classList.add(localStorage.getItem('upCar'));
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
                ele.classList.remove("img0")
                ele.classList.remove("img1")
                ele.classList.remove("img2")
                ele.classList.remove("img3")

                let randomImg = Math.floor(Math.random() * 4);
                if (randomImg === 0) { ele.classList.add("img0") }
                if (randomImg === 1) { ele.classList.add("img1") }
                if (randomImg === 2) { ele.classList.add("img2") }
                if (randomImg === 3) { ele.classList.add("img3") }

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

    const handleRect = () => {
        let enemies = document.querySelectorAll('.enemy');
        let MyCarRect = MyCar.getBoundingClientRect();
        let CollideFlag = 0;
         gameOverMessage = document.querySelector(".gameOverPara");
        enemies.forEach(ele => {
            let enemyCarRect = ele.getBoundingClientRect();
            if (!((MyCarRect.bottom < enemyCarRect.top) || (MyCarRect.top > enemyCarRect.bottom) || (MyCarRect.right < enemyCarRect.left) || (MyCarRect.left > enemyCarRect.right))) {
                localStorage.setItem('coins', coins);
                saveCoins();
                gameOverMessage.classList.remove("hide")
                gameOverMessage.innerHTML = "Game over Your score is :" + scoreGame;
                window.setTimeout(()=>{gameOverMessage.classList.add("hide")},2000)
                window.setTimeout(()=>{AppGame.innerHTML = ""},2000)
                GameStart = false;
            }
        })
        if(CollideFlag){
           
        }
    }

    const handleScoreGame = () => {
        var score = document.querySelector(".score");
        scoreGame += points;
        if (scoreGame % 500 === 0) {
            points++;
            speedCar += 2;
        }
        coins = parseInt(localStorage.getItem('coins')) + Math.round(scoreGame / 10);
        score.innerHTML = "Score :" + scoreGame + "<br>"+ "🪙" + "Coins :" + coins + "<br>"  + "Speed :" + speedCar;
    }
    const handleUpGradeCar = () => {
        playAgain = document.querySelector(".playAgain")
        app = document.querySelector(".App")
        score = document.querySelector(".score");
        container = document.getElementById("Container");

        if (upGradeVisible === 0) {

            if (upGradeFirstTime) { 
                garage = document.createElement("div")
                let arr = [500, 1000, 1500]
                for (let i = 4; i < 7; i++) {
                    newCar = document.createElement("div");
                    newCar.setAttribute("class", "item");
                    let imgname = "img" + (i + 1);
                    newCar.classList.add(imgname)
                    newCar.style.top = "200px";
                    newCar.style.left = 10 * i + "%"
                    newCar.innerHTML += "</br></br></br></br></br></br> " + arr[i-4] + "🪙";
                    newCar.dataset.img = imgname
                    newCar.id = arr[i-4]
                    garage.appendChild(newCar);
                    newCar.onclick = function () {

                        if (coins >= this.id) {
                            if(window.confirm("you sure you want to buy this car ?")){
                            localStorage.setItem('upCar', this.dataset.img);
                            localStorage.setItem('coins', parseInt(localStorage.getItem('coins')) - this.id);
                            coins = parseInt(localStorage.getItem('coins'))
                            score.innerHTML = "Score :" + scoreGame + "<br>" + "Coins :" + coins + "🪙"+ "<br>" + "Speed :" + speedCar;
                            saveCoins()
                            axios.post('http://localhost:5000/api/cars/upGradeCar', {
                                upCar: this.dataset.img,
                                username: localStorage.getItem('username')
                          
                            
                    })
                    alert("Congrats you bought a new car")
                }
                        } else {
                            alert("you don't have enough coins")
                        }
                    };
                }
                console.log(garage)
                container.appendChild(garage);
                upGradeFirstTime = 0;

            }
            upGradeVisible = 1;
            garage.classList.remove('hide');
            container.appendChild(garage);
            app.classList.add('hide');
            score.classList.add('hide');
            playAgain.classList.add('hide');
            logO.classList.add('hide');
            upGradecar=document.querySelector(".upGradecar")
            upGradecar.innerHTML="Close Market";

        }
        else {
            garage.classList.add('hide');
            upGradeVisible = 0;
            app.classList.add('hide');
            score.classList.remove('hide');
            playAgain.classList.remove('hide');
            logO.classList.remove('hide');
            upGradecar.innerHTML="Open Market";
        }
    }
    const PlayGame = () => {
        moveLines();
        MoveEnemyCar();
        handleMoving();
        handleScoreGame();
        handleRect();
        if (GameStart)
            window.setTimeout(window.requestAnimationFrame(PlayGame), 1000);
        else {

            window.setTimeout(()=>{app.classList.add('hide')},2000);
            window.setTimeout(()=>{playAgain.classList.remove('hide')},2000);
            window.setTimeout(()=>{logO.classList.remove('hide')},2000);
            window.setTimeout(()=>{upGradecar.classList.remove('hide')},2000)
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
        axios.post('http://localhost:5000/api/cars/savecoin', {
            coins: parseInt(localStorage.getItem('coins')),
            username: localStorage.getItem('username')
        })
    }

    return (
        <div>
        <div className="Container" id="Container">
            <div className="score">score</div>
            <button className="logOut" onClick={logOut}> logOut </button>
            <button className="playAgain" id="playAgain" onClick={handlePlayAgain}> Start Play </button>
            <button className='upGradecar' onClick={handleUpGradeCar}>Open Market</button>
            
            <div className="App hide" id="gameApp" >
                <div id="enemy"></div>
            </div>
        </div>
        <div className="gameOverPara hide"></div>
        </div>

    )
}

export default Cars;