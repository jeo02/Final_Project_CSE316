import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Input, InputLabel, Grid, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG"}
        >
            <Box style={style}>
                <Typography align = 'center' variant='h3' className="modal-title">Edit Song Modal</Typography>
                
                <Box style={{padding:10}}>
                <Grid container alignItems="left" justify = "left" direction="column">
                    <InputLabel>Title</InputLabel>
                    <Input 
                        id = "edit-song-modal-title"
                        className='modal-input'
                        defaultValue={title} 
                        onChange={handleUpdateTitle} 
                        label="Title"
                        >    
                    </Input>
                
                    <InputLabel>Artist</InputLabel>
                    <Input 
                        id = "edit-song-modal-artist"
                        className='modal-input'
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} 
                        label="Artist">    
                    </Input>
                
                    <InputLabel>YouTubeId</InputLabel>
                    <Input 
                        id = "edit-song-modal-youTubeId"
                        className='modal-input'
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} 
                        label="YouTubeId">    
                    </Input>   
                </Grid>
                </Box>
                <Box display="flex" justifyContent="space-around" style={{backgroundColor:'lightgrey'}}>
                    <Button 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        variant="contained"
                        onClick={handleConfirmEditSong}>
                            Confirm
                    </Button>
                    <Button
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        variant="contained"
                        onClick={handleCancelEditSong}>
                            Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
//store.addUpdateSongTransaction(store.currentSongIndex, newSongData);