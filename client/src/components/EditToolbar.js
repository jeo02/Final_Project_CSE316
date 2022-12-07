import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { id, published, userName } = props;

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    function handlePublish(){
        store.publish(store.currentList._id);
    }

    async function handleDeleteList(event) {
        event.stopPropagation()
        store.markListForDeletion(id);
    }

    function handleDuplicate(){
        store.createNewList("Copy: " + store.currentList.name)
    }

    let editToolbar = "";
    if(store && store.currentList){
        if(!published){
            editToolbar = 
                <Grid container>
                    <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-start", gap:"10px"}}>
                        <Button 
                            disabled={!store.canUndo()}
                            id='undo-button'
                            onClick={handleUndo}
                            variant="contained">
                                Undo
                        </Button>
                        <Button 
                            disabled={!store.canRedo()}
                            id='redo-button'
                            onClick={handleRedo}
                            variant="contained">
                                Redo
                        </Button>
                    </Grid>

                    <Grid item xs = {6} sx={{display:"flex", justifyContent:"flex-end", gap:"10px"}}>
                        <Button 
                            //disabled={!store.canRedo()}
                            id='publish-button'
                            onClick={handlePublish}
                            variant="contained">
                                Publish
                        </Button>
                        <Button
                            id='delete-button'
                            onClick={handleDeleteList}
                            variant="contained">
                                Delete
                        </Button>
                        <Button 
                            //disabled={!store.canRedo()}
                            id='duplicate-button'
                            onClick={handleDuplicate}
                            variant="contained">
                                Duplicate
                        </Button>
                    </Grid>
                </Grid>
        }
        else{
            editToolbar = 
                <Grid container>
                    <Grid item xs = {7}></Grid>

                    <Grid item xs = {5} sx={{display:"flex", justifyContent:"flex-end", gap:"10px"}}>
                        {
                            userName === auth.user.userName
                            ?
                            <Button
                                id='delete-button'
                                onClick={handleDeleteList}
                                variant="contained">
                                    Delete
                            </Button>
                            :
                            ""
                        }
                        <Button 
                            //disabled={!store.canRedo()}
                            id='duplicate-button'
                            onClick={handleDuplicate}
                            variant="contained">
                                Duplicate
                        </Button>
                    </Grid>
                </Grid>
        }
    }

    if(auth.user && auth.user.userName === "guest"){
        editToolbar = "";
    }

    return (
        <div>
           {editToolbar} 
        </div>
        
    )
}

export default EditToolbar;