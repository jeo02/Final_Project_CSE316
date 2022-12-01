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
        store.createNewList();
    }

    let text = "Your Lists";
    let button = 
        <IconButton
            sx={{color: "white"}}
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
        >
            <AddIcon sx={{fontSize: "50px"}} />
        </IconButton>

    let statusName = "statusbar";
    if (auth.user !== null) {
        statusName = "statusbar-visible"
    }
    if (store.currentList){
        text = store.currentList.name;
        button = ""
    }
    return (
        <Box sx={{display:"flex", justifyContent: "center", backgroundColor: "#2C7CE4"}} className={statusName}>
            {button}
            <Typography variant="h3" sx={{color: "white", marginLeft: "10px"}}>{text}</Typography>
            
        </Box>
    );
}
/*
<Fab 
    color="primary" 
    aria-label="add"
    id="add-list-button"
    onClick={handleCreateNewList}
>
    <AddIcon />
</Fab>
<Typography variant="h2">All Playlists</Typography>*/

export default Statusbar;