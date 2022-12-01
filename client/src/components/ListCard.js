import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, List, Typography } from '@mui/material';
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar'
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
/*
    This is a card in our list of playlists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, changeCallback, expanded } = props;

    function handleToggleEdit(event) {
        if(event.detail === 2 && !store.listNameActive && expanded === false){
            console.log("what is expanded", expanded)
            event.stopPropagation();
            toggleEdit();
        }
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function toggleEdit() {
        let newActive = !editActive;
        store.setIsListNameEditActive();
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleAddNewSong() {
        store.addNewSong();
    }

    const handleChangeCallback = (event, id) => {
        console.log("what you doing here?")
        if(event.detail === 1 && !editActive){
            changeCallback(id, !(expanded === id));
        }
    }

    function handleLike(){
        store.likeList(idNamePair._id);
    }

    function handleDislike(){
        store.dislikeList(idNamePair._id);
    }

    //These variables are for determining wether the list is liked/disliked
    //by the current user
    let userName = auth.user.userName
    let likes = new Set(idNamePair.likes);
    let dislikes = new Set(idNamePair.dislikes);

    let isLiked = likes.has(userName);
    let isDisliked = dislikes.has(userName);

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let cardElement =
        <Box
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', flexDirection:"column", p: 1}}
            style={{ width: '100%', fontSize: '25pt'}}
        >
            <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto' }}>
                {idNamePair.name}
            </Box>
            <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto', fontSize: "14pt"}}>
                {"By: " + idNamePair.userName}
            </Box>
        </Box>
    
    
    if(idNamePair.published){
        cardElement = 
            <Grid container
                alignItems={"center"}
                id={idNamePair._id}
                key={idNamePair._id}
            >
                <Grid item xs={6}
                    sx={{display: 'flex', flexDirection:"column", p: 1}}
                    style={{ width: '100%', fontSize: '25pt'}}
                >
                    <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto' }}>
                        {idNamePair.name}
                    </Box>
                    <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto', fontSize: "14pt"}}>
                        {"By: " + idNamePair.userName}
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <IconButton onClick={handleLike}>
                        {
                            isLiked
                            ?
                            <ThumbUpIcon sx={{fontSize: "40px", marginRight: "10px"}}/>
                            :
                            <ThumbUpOffAltIcon sx={{fontSize: "40px", marginRight: "10px"}}/>
                        }
                        
                        {idNamePair.likes.length}
                    </IconButton>
                </Grid>
                <Grid item xs={3}>
                    <IconButton onClick={handleDislike}>
                        {
                            isDisliked
                            ?
                            <ThumbDownIcon sx={{fontSize: "40px", marginRight: "10px"}}/>
                            :
                            <ThumbDownOffAltIcon sx={{fontSize: "40px", marginRight: "10px"}}/>
                        }
                        
                        {idNamePair.dislikes.length}
                    </IconButton>
                </Grid>
            </Grid>
    }
    
    let date = ""
    if(idNamePair.published){
        date = new Date(idNamePair.publishedOn);
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"         
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    
    let cardStyles = {borderRadius:"15px !important", margin:"5px 0 5px 5px !important"}
    let boxStyles = {}
    if(idNamePair.published){
        boxStyles={backgroundColor: "#b9d2ee", borderRadius:"15px !important", margin:"5px 0 5px 5px !important"}
        cardStyles = {backgroundColor: "#b9d2ee", boxShadow:"none", borderRadius:"15px !important"}
    }

    return (
        <Box sx={boxStyles}>
        <Accordion 
            expanded={expanded === idNamePair._id}  
            key={idNamePair._id} 
            onClick = {handleToggleEdit}
            sx={cardStyles}>
            <AccordionSummary
                expandIcon={
                    <IconButton
                        onClick = {(event) => {handleChangeCallback(event, idNamePair._id)}}>
                        <ExpandMoreIcon/>
                    </IconButton>
                }  
                sx={{backgroundColor: "inherit !important", borderRadius:"15px !important"}}  
            >
                {cardElement}
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{maxHeight: "250px", overflow:"scroll"}}>
                    {
                        store.currentList 
                        ? 
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                            />
                            
                        )) 
                        :
                        ""
                    }
                    
                </List>
                {
                    !idNamePair.published
                    ?
                    <ListItem 
                        button 
                        sx={{display:"flex", justifyContent:"center", fontSize: "30pt"}}
                        onClick={handleAddNewSong}>
                        +
                    </ListItem>
                    :
                    ""
                }
                
                {modalJSX}
                <EditToolbar 
                    id={idNamePair._id} 
                    published={idNamePair.published}
                    userName={idNamePair.userName}/>

            </AccordionDetails>
        </Accordion>
        {
            idNamePair.published
            ?
            <Grid container sx={{paddingBottom: "10px"}}>
                <Grid item xs={4}>
                    <Typography sx={{fontSize: "11px", marginLeft: "32px"}}>
                        <b>published: </b> {monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}
                    </Typography>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={3}>
                    <Typography sx={{fontSize: "11px"}}>
                        <b>Listens: </b>{idNamePair.views}
                    </Typography>
                </Grid>
            </Grid>
            :
            ""
        }
        </Box>
    );
}

export default ListCard;