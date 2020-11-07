import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import "./SearchView.css";

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
}));

function SearchBar() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Enter summoner name"
                inputProps={{"aria-label": "search force graph"}}
            />
            <IconButton
                className={classes.iconButton}
                aria-label="search"
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
