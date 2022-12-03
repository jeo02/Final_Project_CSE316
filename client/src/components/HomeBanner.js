import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import { Grid, IconButton, Input, InputLabel, Menu, MenuItem, TextField, Typography} from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function HomeBanner(props) {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [ search, setSearch ] = useState("");

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    function handleSearchUpdate(event) {
        setSearch(event.target.value);
    }

    function handleHome(){
        store.listScreenHome("");
    }

    function handleAllLists(){
        store.listScreenAll("");
    }

    function handleAllUsers(){
        store.listScreenUsers("");
    }

    function handleSortName(){
        handleMenuClose();
        store.sortByName();
    }

    function handleSortPublish(){
        handleMenuClose();
        store.sortByPublishedDate();
    }

    function handleSortListens(){
        handleMenuClose();
        store.sortByListens();
    }

    function handleSortDislikes(){
        handleMenuClose();
        store.sortByDislikes();
    }

    function handleSortLikes(){
        handleMenuClose();
        store.sortByLikes();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(store.currentListScreen === "HOME"){
                store.listScreenHome(search);
            }
            else if(store.currentListScreen === "ALL_LISTS"){
                store.listScreenAll(search);
            }
            else{
                store.listScreenUsers(search);
            }
        }
    }

    const myTheme = createTheme({
        palette:{
            mode: "dark",
            primary:{
                main: "#2C7CE4"
            }
        }
    });

    console.log("poop",store.currentListScreen)
    let homeDisabled = store.currentListScreen === "HOME";
    let allDisabled = store.currentListScreen === "ALL_LISTS";
    let usersDisabled = store.currentListScreen === "ALL_USERS";

    return(
        <Grid container alignItems="center" sx={{color:"white"}}>
            <Grid item xs={3} sx={{display:"flex", justifyContent:"flex-start", gap:"10px"}}>
                <IconButton 
                    id='home-button'
                    color = "inherit"
                    size="large"
                    disabled={homeDisabled}
                    onClick={handleHome}
                    >
                        <HomeIcon sx={{fontSize: "50px"}}/>
                </IconButton>
                <IconButton 
                    id='all-lists-button'
                    color = "inherit"
                    size="large"
                    disabled={allDisabled}
                    onClick={handleAllLists}
                    >
                        <GroupsIcon sx={{fontSize: "50px"}}/>
                </IconButton>
                <IconButton 
                    id='account-button'
                    color = "inherit"
                    size="large"
                    disabled={usersDisabled}
                    onClick={handleAllUsers}
                    >
                        <PersonIcon sx={{fontSize: "50px"}}/>
                </IconButton>
            </Grid>
            <Grid item xs sx={{margin: "0 10px 0 10px"}}>
                <ThemeProvider theme={myTheme}>
                    <TextField
                        id = "home-search-bar"
                        onChange={handleSearchUpdate} 
                        onKeyDown={handleKeyPress}
                        label="Search"
                        fullWidth>
                    </TextField>
                </ThemeProvider>
            </Grid>

            <Grid item xs = {3} sx={{display:"flex", justifyContent:"flex-end", alignItems: "center", gap:"10px"}}>
                <Typography>SORT BY</Typography>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                >
                    <SortIcon sx={{fontSize: "50px"}}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleSortName}>Name (A - Z)</MenuItem>
                    <MenuItem onClick={handleSortPublish}>Published Date (Newest)</MenuItem>
                    <MenuItem onClick={handleSortListens}>Listens (High - Low)</MenuItem>
                    <MenuItem onClick={handleSortLikes}>Likes (High - Low)</MenuItem>
                    <MenuItem onClick={handleSortDislikes}>Dislikes (High - Low)</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )

}

export default HomeBanner;