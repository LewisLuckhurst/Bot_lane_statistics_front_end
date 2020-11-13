import './App.css';
import SearchView from "./components/search-view/SearchView";
import React, {useState} from "react";
import StatisticsView from "./components/statistics-view/StatisticsView";

function App() {
    const [summonerObject, setSummonerObject] = useState(null);
    const [loaded, setLoaded] = useState(false);


    if(!loaded){
        return <SearchView updateSummoner={updateSummonerObject}/>
    } else {
        return <StatisticsView summoner={summonerObject}/>
    }

    function updateSummonerObject(summonerName){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ summonerName: summonerName })
        };

        fetch("http://localhost:8080/getBotLaneStatistics", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setSummonerObject(result)
                    setLoaded(true)
                },
                (error) => {
                    throw error
                }
            )
    }
}

export default App;
