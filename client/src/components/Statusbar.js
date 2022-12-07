import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fab, IconButton, Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleCreateNewList() {
        store.createNewList("Untitled");
    }

    let text = "Your Lists";
    
    let button = "";

    if(store.currentListScreen === "HOME"){
        button = 
            <IconButton
                sx={{color: "white"}}
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon sx={{fontSize: "50px"}} />
            </IconButton>
        if(store.searchBarText !== null){
            button = "";
            text = store.searchBarText + " Playlists"
        }
    }
    else if(store.currentListScreen === "ALL_LISTS"){
        text = "All Lists"
        if(store.searchBarText !== null){
            text = store.searchBarText + " Playlists"
        }
    }
    else if(store.currentListScreen === "ALL_USERS"){
        text = "User Lists"
        if(store.searchBarText !== null){
            text = store.searchBarText + "'s Lists"
        }
    }

    let statusName = "statusbar";
    if (auth.user !== null) {
        statusName = "statusbar-visible"
    }
    if (store.currentList){
        text = store.currentList.name;
        button = ""
    }
    return (
        <Box sx={{display:"flex", justifyContent: "center", backgroundColor: "#2C7CE4", alignItems: "center"}} className={statusName}>
            {button}
            <Typography variant="h3" sx={{color: "white", marginLeft: "10px"}}>{text}</Typography>
            
        </Box>
    );
}

export default Statusbar;