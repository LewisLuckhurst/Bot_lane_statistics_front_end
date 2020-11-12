import React, {useState, Component} from "react";
import "./StatisticsView.css"
import logo from './4789.png';

function StatisticsView() {
    return (
        <>
            <div className="wrapper">
                <WinLossRatio/>
                <Selector/>
                <Champion/>
            </div>
        </>
    );
}

function WinLossRatio() {
    return (
        <div className="card">
            <img src={logo} alt={"profile icon"}/>
            <div className="winLossRatioContainer">
                <b>Win/Loss percentage:</b>
                <div className="losses"/>
                <div className="wins"/>
                <div className="winLossRatioText">
                    <b>40%</b>
                </div>
            </div>
            <div className="text">
                <b>Lucky</b>
                <p><b>Level: </b>500</p>
            </div>
        </div>
    );
}

function Selector() {
    const [animationFinished, setAnimationFinished] = useState(true);
    const [animation, setAnimation] = useState("");


    function setAnimationTwo(s) {
        if (s === "supportAndAdc" && animationFinished === true) {
            setAnimation("moveLeft")
        }

        if (s === "supportOnly" && animationFinished === true) {
            setAnimation("moveRight")
        }
    }

    return (
        <div className="card">
            <div className="supportAndAdc" onClick={() => setAnimationTwo("supportAndAdc")}>
                <p><b>Support and Adc</b></p>
            </div>
            <div className="supportOnly" onClick={() => setAnimationTwo("supportOnly")}>
                <p><b>Support Only</b></p>
            </div>
            <div className={'selectorBackground ' + animation}
                 onAnimationStart={() => setAnimationFinished(false)}
                 onAnimationEnd={() => setAnimationFinished(true)}
            />
        </div>
    );
}

function Champion() {
    const [animationFinished, setAnimationFinished] = useState(true);
    const [animation, setAnimation] = useState("none");


    function setAnimationTwo() {
        if(animation === "none"){
            setAnimation("show")
        }

        if(animation === "hide" && animationFinished === true){
            setAnimation("show")
        }

        if(animation === "show" && animationFinished === true){
            setAnimation("hide")
        }
    }

    return (
        <div className="card">
            <img src={logo} alt={"profile icon"}/>
            <div className="winLossRatioContainer">
                <b>Win/Loss percentage:</b>
                <div className="losses"/>
                <div className="wins"/>
                <div className="winLossRatioText">
                    <b>40%</b>
                </div>
            </div>
            <div className="text">
                <b>Jhin</b>
                <p><b>Wins: </b>10</p>
                <p><b>Losses: </b>5</p>
            </div>
            <div className="supportTitle">
                <b onClick={() => test()}>Show supports</b>
            </div>
            <div className={"supportContainer " + animation} onAnimationStart={() => setAnimationFinished(false)}
            onAnimationEnd={() => setAnimationFinished(true)}>
                <Support/>
                <Support/>
            </div>
        </div>
    );
}

function Support() {
    return (
        <div className="container">
            <img src={logo} alt={"profile icon"}/>
            <div className="winLossRatioContainer">
                <b>Win/Loss percentage:</b>
                <div className="losses"/>
                <div className="wins"/>
                <div className="winLossRatioText">
                    <b>40%</b>
                </div>
            </div>
            <div className="text">
                <b>Jhin</b>
                <p><b>Wins: </b>10</p>
                <p><b>Losses: </b>5</p>
            </div>
        </div>
    );
}

export default StatisticsView