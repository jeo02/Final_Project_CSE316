import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'
import { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, List, ListItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Comments(){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [comment, setComment] = useState("");

    function handleUpdate(event){
        setComment(event.target.value);
    }

    function handleKeyPress(event){
        if(event.code === "Enter"){
            store.updateComments({user: auth.user.userName, description: comment});
            setComment("");
        }
    }

    let style = {
        display:"grid", 
        gridTemplateRows:"88% 12%", 
        height:"90%", 
        margin: "5px 10px 0 10px", 
        borderRadius: "15px",
        backgroundColor: "white"
    }

    return(
        <Box sx={style}>
            <List sx={{gridRowStart:"1", overflow: "scroll"}}>
                {
                    store.currentList && store.currentList.published
                    ?
                    store.currentList.comments.map((comment, index) =>(
                        <ListItem
                            key={"comment-" + index} 
                            sx={{backgroundColor:"#b9d2ee", borderRadius: "15px", margin: "10px", width:"95%"}}>
                            
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant ="h5">
                                        {comment.user}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={"body"}>
                                        {comment.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        
                    ))
                    :
                    ""
                }
            </List>
            <Box sx={{gridRowStart:"2", display: "flex", alignItems: "center", padding:"0 10px 0 10px",backgroundColor: "#b9d2ee", borderRadius: "0 0 15px 15px"}}>
                {
                    auth.user && auth.user.userName !== "guest"
                    ?
                    <TextField
                        onChange={handleUpdate}
                        value={comment}
                        onKeyDown={handleKeyPress}
                        label="Comment"
                        fullWidth
                        sx={{backgroundColor:"white"}}>
                    </TextField>
                    :
                    ""
                }
                
            </Box>
        </Box>
    );
}