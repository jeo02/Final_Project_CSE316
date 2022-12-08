import { ListItem, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index, published } = props;

    function handleDragStart(event) {
        if(!published){
            event.dataTransfer.setData("song", index);
        }
        
    }

    function handleDragOver(event) {
        if(!published){
            event.preventDefault();
        }
    }

    function handleDragEnter(event) {
        if(!published){
            event.preventDefault();
            setDraggedTo(true);
        }
        
    }

    function handleDragLeave(event) {
        if(!published){
            event.preventDefault();
            setDraggedTo(false);
        }
        
    }

    function handleDrop(event) {
        if(!published){
            event.preventDefault();
            let targetIndex = index;
            let sourceIndex = Number(event.dataTransfer.getData("song"));
            setDraggedTo(false);

            // UPDATE THE LIST
            store.addMoveSongTransaction(sourceIndex, targetIndex);
        }
        
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2 && !published) {
            store.showEditSongModal(index, song);
        }
    }
    let removeButton = ""
    if(!store.currentList.published){
        removeButton = 
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleRemoveSong} aria-label='delete'>
                    <ClearIcon style={{fontSize:'25pt'}} />
                </IconButton>
            </Box>
    }
    
    let style = {
        display: 'flex', 
        p: 1,
    }
    if(index === store.songPlayIndex){
        style = {
            display: 'flex', 
            p: 1,
            backgroundColor: "white",
            borderRadius: "15px"
        }
    }
    return (
        <ListItem 
            key={index}
            id={'song-' + index + '-card'}
            sx={style}
            style={{ width: '100%'}}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            button
            onClick={handleClick}>
                <Box sx={{ p: 1, flexGrow: 1, fontSize:'25pt' }}>
                    {index + 1}.{" "}{song.title} by {song.artist}
                </Box>
                {removeButton}
        </ListItem>
    );
}
export default SongCard;