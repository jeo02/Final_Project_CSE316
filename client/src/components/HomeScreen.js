import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import HomeBanner from './HomeBanner'
import Player from './Player'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    const [tabIndex, setTabIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);


    const handleAccordianChange = (id, isExpanded) => {
        if(!isExpanded){
            store.closeCurrentList();
        }
        else{
            store.setCurrentList(id);
        }
        setExpanded(isExpanded ? id : false);
    };

    
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

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
        gridTemplateRows: "13% 87%"
    }
    return (
        <Box sx = {style}>
            <Box sx={{display: "flex", alignItems: "center", gridColumnStart:"1", gridColumnEnd:"3", paddingTop: "15px"}}>
                <HomeBanner />
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
                <Box>
                    {
                        tabIndex === 0
                        ?
                        <Player/>
                        :
                        ""
                    }
                    {
                        tabIndex === 1
                        ?
                        <p>poop</p>
                        :
                        ""
                    }
                </Box>
            </Box>

        </Box>
        
    )
}

export default HomeScreen;