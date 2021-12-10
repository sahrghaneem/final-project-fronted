import React from "react";
const Game = () => {
    var playAgain = document.querySelector(".playAgain");
    var lines = null;

    const PlayGame = () => {
        moveLines();
        MoveEnemyCar();
        handleMoving();
        handdelScoreGame();
        handelRect();
        if (GameStart)
            window.setTimeout(window.requestAnimationFrame(PlayGame), 3000);
        else {
            playAgain.classList.remove('hide');
        }
    }
    const handdelScoreGame = () => {
        var score = document.querySelector(".score");
        scoreGame += points;
        if (scoreGame % 500 === 0) {
            console.log("we are increasing the speed")
            points++;
            speedCar += 2;
        }
        coins = Math.round(scoreGame / 10);
        score.innerHTML = "<br>Score :" + scoreGame + "<br>" + "Coins :" + coins + "<br>" + "Speed :" + speedCar;
    }

    const handlePlayAgain = () => {
        Start();
    }

    const handelRect = () => {
        let enemies = document.querySelectorAll('.enemy');
        let MyCarRect = MyCar.getBoundingClientRect();
        enemies.forEach(ele => {
            let enemyCarRect = ele.getBoundingClientRect();
            if (!((MyCarRect.bottom < enemyCarRect.top) || (MyCarRect.top > enemyCarRect.bottom) || (MyCarRect.right < enemyCarRect.left) || (MyCarRect.left > enemyCarRect.right))) {
                AppGame.innerHTML = "Game over Your score is :-" + MyCar.scoreGame;
                GameStart = false;
            }
        })
    }

    const moveLines = () => {
        lines = document.querySelectorAll(".lines");
        lines.forEach(function (item) {
            if (parseInt(item.style.top) > 608)
                item.style.top = "-35px"
            else
                item.style.top = parseInt(item.style.top) + speedCar + "px";
        })
    }

    return (
        <div>
            <button className="playAgain" id="playAgain" onClick={handlePlayAgain}>Play Again</button>
            <div className="App" id="gameApp" >
                <div id="enemy"></div>

            </div>
        </div>
    )
}
export default Game;