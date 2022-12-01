import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { YouTubePlayer } from '.';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';

export default function Player(){
    const { store } = useContext(GlobalStoreContext);
    let [index, setIndex] = useState(0);

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setIndex((index+1) % store.currentList.songs.length);
    }

    function decSong(){
        setIndex((index-1) % store.currentList.songs.length)
    }

    let playingInfoStyles = {
        display: "flex",
        justifyContent: "flex-start",
    }
    
    return (
        <Card sx={{height:"100%"}}>
            <Box sx={{minHeight: "300px"}}>
                {
                    store.currentList
                    ?
                    <YouTubePlayer currentSong={index} incSong={incSong}/>
                    :
                    ""
                }
            </Box>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} sx={{display:"flex", justifyContent:"center"}}>
                        <Typography variant="h5">
                            Now Playing
                        </Typography>
                    </Grid>
                    {
                        store.currentList
                        ?
                        <Grid container sx={{margin: "20px 0 0 0"}}>
                            <Grid item xs={2}><b>Playlist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.name}</Grid>

                            <Grid item xs={2}><b>Song #:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{index+1}</Grid>

                            <Grid item xs={2}><b>Title:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[index].title}</Grid>

                            <Grid item xs={2}><b>Artist:</b></Grid>
                            <Grid item xs={10} sx={playingInfoStyles}>{store.currentList.songs[index].artist}</Grid>
                        </Grid>
                        :
                        ""
                    }
                </Grid>

            </CardContent>
        </Card>
    );
}