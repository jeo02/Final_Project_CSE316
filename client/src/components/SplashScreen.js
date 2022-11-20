import { Button, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SplashScreen() {
    let buttonStyle={
        display:"flex",
        justifyContent:"space-evenly"
    }
    return (
        <div id="splash-screen">
            <Grid container>
                <Grid item xs>
                </Grid>

                <Grid item xs={7} container>
                    <Grid item xs = {12} sx={{paddingBottom:"5%"}}>
                        <Typography variant="h1" className="logo">
                            Playlister
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{paddingBottom:"5%"}}>
                        <Typography variant="h3">
                            Welcome to the Playlister!
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{paddingBottom:"15%"}}>
                        <Typography variant="h5">
                            The Playlister is a web application where you can make playlists and share them publicly.
                            You can see and comment on others peoples playlists or browse anonymously as a guest.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{paddingBottom:"5%"}}>
                        <Box style={buttonStyle}>
                            <Button href="/register/" variant="contained" sx={{fontSize:"18px", width:"250px"}}>
                                Create Account
                            </Button>
                            
                            <Button href="/login/" variant="contained" sx={{fontSize:"18px", width:"250px"}}>
                                Login
                            </Button>
                            <Button variant="contained" sx={{fontSize:"18px", width:"250px", padding:"15px"}}>
                                Continue as Guest
                            </Button> 
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant = "body1">
                            Created by: Juan Ospina
                        </Typography>
                    </Grid>
                    
                </Grid>

                <Grid item xs>
                </Grid>
            </Grid>
        </div>
       
    )
}

/*
 <div id="splash-screen">
            <Box style={style}>
                <Typography variant="h1" id="logo">
                    Playlister
                </Typography>
                <Typography variant="h3">
                    Welcome to the Playlister!
                </Typography>
                <Typography variant="h5">
                    The Playlister is a web application where you can make playlists and share them publicly.
                    You can see and comment on others peoples playlists or browse anonymously as a guest.
                </Typography>
                <Box style={buttonStyle}>
                    <Button variant="contained">
                        Create Account
                    </Button>
                    <Button variant="contained">
                        Login
                    </Button>
                    <Button variant="contained">
                        Continue as Guest
                    </Button> 
                </Box>
            </Box>
        </div>
*/