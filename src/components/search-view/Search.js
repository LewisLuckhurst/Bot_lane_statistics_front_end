import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchView.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function SearchBar(props) {
    const classes = useStyles();
    const [summonerName, setSummonerName] = useState("");
    const [region, setRegion] = useState("");

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    return (
        <>
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Enter summoner name"
                    inputProps={{"aria-label": "search force graph"}}
                    onChange={(e) => setSummonerName(e.target.value)}
                />
                <IconButton
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={() => props.updateSummonerObject(summonerName)}
                >
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <FormControl className={classes.formControl}>
                <InputLabel>Region</InputLabel>
                <Select
                    value={region}
                    onChange={handleChange}
                >
                    <MenuItem value={"EUW"}>EUW</MenuItem>
                    <MenuItem value={"NA"}>NA</MenuItem>
                </Select>
            </FormControl>
        </>
    )
        ;
}

export default SearchBar;
