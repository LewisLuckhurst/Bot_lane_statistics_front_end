import React, {useState} from "react";
import "./StatisticsView.css"
import logo from './4789.png';

function StatisticsView({summoner}) {
    const [supportOnly, setSupportOnly] = useState(false);

    let championList = []
    let supports = []

    function generateChampion() {
        for (let key of Object.keys(summoner.champions)) {
            championList.push(<Champion summoner={summoner} championName={key}/>)
        }
    }

    function generateSupports() {
        for (let key of Object.keys(summoner.supports)) {
            let wins = parseInt(summoner.supports[key].wins);
            let losses = parseInt(summoner.supports[key].losses);
            let winRate = parseInt((wins / (wins + losses)) * 100, 10).toString() + "%";
            supports.push(<Support supportName={key} wins={wins} losses={losses} winRate={winRate} onlySupport={true}/>)
        }
    }

    generateChampion()
    generateSupports()

    return (
        <>
            <div className="wrapper">
                <WinLossRatio summoner={summoner}/>
                <Selector onlySupport={setSupportOnly}/>
                {!supportOnly &&
                championList}

                {supportOnly &&
                supports}
            </div>
        </>
    );
}

function WinLossRatio({summoner}) {

    let winRate = "0%";
    let wins = 0;
    let losses = 0;
    calculateWinRate()

    return (
        <div className="card">
            <div className="container">
                <div className="imgContainer">
                    <img
                        src={"http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/" + summoner.profileIcon + ".png"}
                        alt={"profile icon"}
                        style={{width: "120px"}}/>
                </div>
                <div className="text">
                    <b>{summoner.summonerName}</b>
                    <p><b>Level: </b>{summoner.summonerLevel}</p>
                    <p><b>Wins: </b>{wins}</p>
                    <p><b>Losses: </b>{losses}</p>
                </div>

                <div className="winLossRatioContainer">
                    <b>Win/Loss percentage:</b>
                    <div className="losses"/>
                    <div className="wins" style={{width: winRate}}/>
                    <div className="winLossRatioText">
                        <b>{winRate}</b>
                    </div>
                </div>
            </div>
        </div>
    );

    function calculateWinRate() {
        for (let key of Object.keys(summoner.champions)) {
            for (let keyTwo of Object.keys(summoner.champions[key].supports)) {
                wins = wins + parseInt(summoner.champions[key].supports[keyTwo].wins)
                losses = losses + parseInt(summoner.champions[key].supports[keyTwo].losses)
            }
        }

        winRate = parseInt((wins / (wins + losses)) * 100, 10).toString() + "%"
    }
}

function Selector({onlySupport}) {
    const [animationFinished, setAnimationFinished] = useState(true);
    const [animation, setAnimation] = useState("");


    function setAnimationTwo(s) {
        if (s === "supportAndAdc" && animationFinished === true) {
            setAnimation("moveLeft")
            onlySupport(false)
        }

        if (s === "supportOnly" && animationFinished === true) {
            setAnimation("moveRight")
            onlySupport(true)
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


function Champion({summoner, championName}) {
    const [open, setOpen] = useState(false);

    let winRate = "0%";
    let wins = 0;
    let losses = 0;
    calculateWinRate()

    return (
        <div className="card">
            <div className="container">
                <div className="imgContainer">
                    <img src={"http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/" + championName + ".png"}
                         alt={"champion icon"}/>
                </div>
                <div className="text">
                    <b>{championName}</b>
                    <p><b>Wins: </b>{wins}</p>
                    <p><b>Losses: </b>{losses}</p>
                </div>

                <div className="winLossRatioContainer">
                    <b>Win/Loss percentage:</b>
                    <div className="losses"/>
                    <div className="wins" style={{width: winRate}}/>
                    <div className="winLossRatioText">
                        <b>{winRate}</b>
                    </div>
                </div>
            </div>
            <div className="supportTitle">
                <b onClick={() => setOpen(!open)}>Show supports</b>
            </div>
            {open && (
                <Supports summoner={summoner} adcName={championName}/>
            )}
        </div>
    );

    function calculateWinRate() {
        for (let keyTwo of Object.keys(summoner.champions[championName].supports)) {
            wins = wins + parseInt(summoner.champions[championName].supports[keyTwo].wins)
            losses = losses + parseInt(summoner.champions[championName].supports[keyTwo].losses)
        }

        winRate = parseInt((wins / (wins + losses)) * 100, 10).toString() + "%"
    }
}

function Supports({summoner, adcName}) {
    let supports = []
    for (let keyTwo of Object.keys(summoner.champions[adcName].supports)) {
        let wins = parseInt(summoner.champions[adcName].supports[keyTwo].wins);
        let losses = parseInt(summoner.champions[adcName].supports[keyTwo].losses);
        let winRate = parseInt((wins / (wins + losses)) * 100, 10).toString() + "%";

        supports.push(<Support supportName={keyTwo} wins={wins} losses={losses} winRate={winRate} onlySupport={false}/>)
    }

    return (
        <>
            {supports}
        </>
    )
}

function Support({supportName, wins, losses, winRate, onlySupport}) {
    let style = {width: winRate}

    if (winRate === "100%") {
        style = {
            width: winRate,
            borderRadius: "25px"
        }
    }

    let body = (
            <>
                <div className="imgContainer">
                    <img src={"http://ddragon.leagueoflegends.com/cdn/10.23.1/img/champion/" + supportName + ".png"}
                         alt={"profile icon"}/>
                </div>
                <div className="text">
                    <b>{supportName}</b>
                    <p><b>Wins: </b>{wins}</p>
                    <p><b>Losses: </b>{losses}</p>
                </div>
                <div className="winLossRatioContainer">
                    <b>Win/Loss percentage:</b>
                    <div className="losses"/>
                    <div className="wins" style={style}/>
                    <div className="winLossRatioText">
                        <b>{winRate}</b>
                    </div>
                </div>
            </>
        )
    ;

    if (onlySupport) {
        return (
            <div className="card">
                <div className="container">
                    {body}
                </div>
            </div>
        )
    }

    return (
        <div className="container" style={{borderTop: "solid darkgray 5px"}}>
            {body}
        </div>
    );
}

export default StatisticsView