import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, List } from '@mui/material';
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar'
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
/*
    This is a card in our list of playlists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
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


    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
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
        if(event.detail === 1 && !editActive){
            changeCallback(id, !(expanded === id));
        }
    }

    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <Box
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{display: 'flex', p: 1}}
            style={{ width: '100%', fontSize: '30pt'}}
        >
            <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto' }}>{idNamePair.name}</Box>
        </Box>

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

    return (
        <Accordion 
            expanded={expanded === idNamePair._id}  
            key={idNamePair._id} 
            onClick = {handleToggleEdit}>
            
            <AccordionSummary 
                expandIcon={
                    <IconButton
                        onClick = {(event) => {handleChangeCallback(event, idNamePair._id)}}>
                        <ExpandMoreIcon/>
                    </IconButton>
                }
            >
                {cardElement}
            </AccordionSummary>
            <AccordionDetails>
                <List>
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
                    <ListItem 
                        button 
                        sx={{display:"flex", justifyContent:"center", fontSize: "30pt"}}
                        onClick={handleAddNewSong}>
                        +
                    </ListItem>
                </List>
                {modalJSX}
                <EditToolbar/>
            </AccordionDetails>
        </Accordion>
    );
}

export default ListCard;