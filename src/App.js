import './App.css';
import SearchView from "./components/search-view/SearchView";
import React, {useState} from "react";
import StatisticsView from "./components/statistics-view/StatisticsView";

function App() {
    const [summonerObject, setSummonerObject] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);
    let intervalId = null;
    let storedSummonerName = null;


    if (!loaded) {
        return <SearchView updateSummoner={updateSummonerObject}/>
    } else {
        return <StatisticsView summoner={summonerObject} update={update} updateInProgress={updateInProgress}/>
    }

    function callGet(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({summonerName: storedSummonerName})
        };

        fetch("http://localhost:8080/getBotLaneStatistics", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.updateInProgress === "false") {
                        setUpdateInProgress(false)
                        clearInterval(intervalId)
                    }
                    setSummonerObject(result)
                },
                (error) => {
                    throw error
                }
            )
    }

    function update (summonerName) {
        setUpdateInProgress(true)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({summonerName: summonerName})
        };

        fetch("http://localhost:8080/update", requestOptions)

        storedSummonerName = summonerName;
        intervalId = setInterval(callGet, 5000);
    }

    function updateSummonerObject(summonerName) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({summonerName: summonerName})
        };

        fetch("http://localhost:8080/getBotLaneStatistics", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setSummonerObject(result)
                    if(result.updateInProgress === "true"){
                        setUpdateInProgress(true)
                        storedSummonerName = summonerName;
                        intervalId = setInterval(callGet, 5000);
                    }
                    setLoaded(true)
                },
                (error) => {
                    throw error
                }
            )
    }
}

export default App;
