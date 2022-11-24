import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import SongCard from './SongCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Tab, Tabs } from '@mui/material';
import { Box, Container } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditToolbar from './EditToolbar'
import MUIEditSongModal from './MUIEditSongModal'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [tabIndex, setTabIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);


    const handleAccordianChange = (id, isExpanded) => {
        console.log(isExpanded, id)
        if(store.currentList || !isExpanded){
            store.closeCurrentList();
        }
        console.log("back to home")
        setExpanded(isExpanded ? id : false);
        store.setCurrentList(id);
    };

    
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            changeCallback={handleAccordianChange}
                            expanded={expanded}
                        />
                    ))
                }
            </Box>
    }

    let style = {
        display: "grid",
        gridTemplateColumns: "60% 40%",
        gridTemplateRows: "10% 90%"
    }
    return (
        <Box sx = {style}>
            <Box sx={{gridRowEnd:"2", display:"flex", alignItems:"center"}}>
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                        <Typography variant="h2">Your Lists</Typography>
            </Box>

            <Box sx={{gridRowStart:"2", overflow:"scroll"}}>
                {listCard}
                <MUIDeleteModal />
            </Box>

            <Box sx={{gridColumnStart:"2", gridRowStart:"2"}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Player" sx={{color:'white'}}/>
                        <Tab label="Comments" sx={{color:'white'}}/>
                    </Tabs>
                </Box>
            </Box>

        </Box>
        
    )
}
/*<div>

        
        <Grid container>
            <Grid item xs={12} container sx={{height:"inherit"}}>
                <Container>
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                    >
                        <AddIcon />
                    </Fab>
                        <Typography variant="h2">Your Lists</Typography>
                </Container>
                    
            
            </Grid>

            <Grid item xs={8} sx={{height:"inherit", overflow:"scroll"}}>
                {listCard}
                
            </Grid>

            <Grid item xs={4} container>

            </Grid>
        </Grid></div>
/*<div id="playlist-selector">
            
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
        </div>*/
export default HomeScreen;