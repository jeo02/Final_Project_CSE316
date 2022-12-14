import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import CardContent from '@mui/material/CardContent';
import { YouTubePlayer } from '.';
import { Box } from '@mui/system';
import { Grid, IconButton, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Player(){
    const { store } = useContext(GlobalStoreContext);
    let youtubePlayer = null;

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        store.updatePlayIndex((store.songPlayIndex+1) % store.currentList.songs.length);
    }

    function decSong(){
        store.updatePlayIndex((store.songPlayIndex-1) % store.currentList.songs.length);
    }

    function pauseSong(){
        if(youtubePlayer){
            youtubePlayer.stopVideo();
        }
    }

    function playSong(){
        if(youtubePlayer){
            youtubePlayer.playVideo();
        }
    }

    function updatePlayer(ref){
        youtubePlayer = ref;
        console.log(youtubePlayer);
        if(store.songPlayIndex === 1){
            store.updateListens();
        }
        
    }

    let playingInfoStyles = {
        display: "flex",
        justifyContent: "flex-start",
    }

    let styles = {
        backgroundColor: "white", 
        height: "90%", 
        display:"grid", 
        gridTemplateRows:"50% 50%", 
        margin: "5px 10px 0 10px", 
        borderRadius: "15px"
    }

    let buttonStyles = {
        textAlign: "center"
    }
    
    return (
        <Box sx={styles}>
            {
                store.currentList && store.currentList.songs.length > 0
                ?
                <YouTubePlayer 
                    incSong={incSong}
                    updatePlayer={updatePlayer}/>
                :
                <Box></Box>
            }
           
            <CardContent>
                <Grid container>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"center", marginBottom: "20px"}}>
                        <Typography variant="h5">
                            Now Playing
                        </Typography>
                    </Grid>
                    {
                        store.currentList && store.currentList.songs.length > 0
                        ?
                        <Grid container>
                            <Grid item xs={2}><b>Playlist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.name}</Grid>

                            <Grid item xs={2}><b>Song #:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.songPlayIndex+1}</Grid>

                            <Grid item xs={2}><b>Title:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[store.songPlayIndex].title}</Grid>

                            <Grid item xs={2}><b>Artist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[store.songPlayIndex].artist}</Grid>
                            
                            <Grid item xs={12} sx={{marginBottom: "30px"}}></Grid>

                            <Grid item xs ={1}></Grid>
                            <Grid item xs = {10} container sx={{backgroundColor: "#b9d2ee", borderRadius:"15px", borderStyle: "groove"}}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton onClick={decSong}>
                                        <SkipPreviousIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton onClick={pauseSong}>
                                        <StopCircleIcon fontSize='large'/>
                                    </IconButton>    
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton onClick={playSong}>
                                        <PlayArrowIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton onClick={incSong}>
                                        <SkipNextIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid container>
                            <Grid item xs={2}><b>Playlist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}></Grid>

                            <Grid item xs={2}><b>Song #:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}></Grid>

                            <Grid item xs={2}><b>Title:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}></Grid>

                            <Grid item xs={2}><b>Artist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}></Grid>
                            
                            <Grid item xs={12} sx={{marginBottom: "30px"}}></Grid>
                            
                            <Grid item xs ={1}></Grid>
                            <Grid item xs = {10} container sx={{backgroundColor: "#b9d2ee", borderRadius:"15px", borderStyle: "groove"}}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton>
                                        <SkipPreviousIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton>
                                        <StopCircleIcon fontSize='large'/>
                                    </IconButton>    
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton>
                                        <PlayArrowIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2} sx={buttonStyles}>
                                    <IconButton>
                                        <SkipNextIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    }
                </Grid>
            </CardContent>

            
        </Box>
    );
}