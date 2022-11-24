import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { Grid } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { id } = props;

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    async function handleDeleteList(event) {
        event.stopPropagation()
        store.markListForDeletion(id);
    }

    let editToolbar = "";
    if(store && store.currentList && !store.currentList.published){
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
                        //onClick={handleRedo}
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
                        //onClick={handleRedo}
                        variant="contained">
                            Duplicate
                    </Button>
                </Grid>
            </Grid>
    }
    return (
        <div>
           {editToolbar} 
        </div>
        
    )
}

export default EditToolbar;