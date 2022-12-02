import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { YouTubePlayer } from '.';
import { Box } from '@mui/system';
import { Grid, Icon, IconButton, Typography } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Player(){
    const { store } = useContext(GlobalStoreContext);
    let [index, setIndex] = useState(0);
    let youtubePlayer = null;

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setIndex((index+1) % store.currentList.songs.length);
    }

    function decSong(){
        setIndex((index-1) % store.currentList.songs.length)
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
    }

    let playingInfoStyles = {
        display: "flex",
        justifyContent: "flex-start",
    }

    if(!store.currentList && index !== 0){
        setIndex(0);
    }
    let styles = {
        backgroundColor: "white", 
        height: "90%", display:"grid", 
        gridTemplateRows:"50% 50%", 
        margin: "5px 10px 0 10px", 
        borderRadius: "15px"
    }
    
    return (
        <Box sx={styles}>
            {
                store.currentList
                ?
                <YouTubePlayer 
                    currentSong={index} 
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
                        store.currentList
                        ?
                        <Grid container>
                            <Grid item xs={2}><b>Playlist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.name}</Grid>

                            <Grid item xs={2}><b>Song #:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{index+1}</Grid>

                            <Grid item xs={2}><b>Title:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[index].title}</Grid>

                            <Grid item xs={2}><b>Artist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[index].artist}</Grid>
                            
                            <Grid item xs={12} sx={{marginBottom: "30px"}}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={decSong}>
                                    <SkipPreviousIcon fontSize='large'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={pauseSong}>
                                    <StopCircleIcon fontSize='large'/>
                                </IconButton>    
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={playSong}>
                                    <PlayArrowIcon fontSize='large'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={incSong}>
                                    <SkipNextIcon fontSize='large'/>
                                </IconButton>
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
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}>
                                <IconButton>
                                    <SkipPreviousIcon fontSize='large'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton>
                                    <StopCircleIcon fontSize='large'/>
                                </IconButton>    
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton>
                                    <PlayArrowIcon fontSize='large'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton>
                                    <SkipNextIcon fontSize='large'/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </CardContent>

            
        </Box>
    );
}