import React from "react";
import Search from "./Search"

function SearchView(props) {
    return (
        <div className="wrapper">
            <div className="block">
                <h1>Bot Lane Statistics</h1>
                <Search updateSummonerObject={props.updateSummoner}/>
            </div>

            <div className="footer">
                <p>© 2020-2021 BotLaneStatistics.com. Bot lane statistics isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of
                    Riot Games or anyone officially involved in producing or managing League of Legends. League of
                    Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends
                    © Riot Games, Inc.
                </p>
            </div>
        </div>
    )
}

export default SearchView;