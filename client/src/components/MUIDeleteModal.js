import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding:0
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <Typography align='center' variant='h3' className="modal-title">Delete Playlist?</Typography>
                <Box style={{padding:10}}>
                    <Typography align="left" variant="h5">
                    Are you sure you wish to permanently delete the <b>{name}</b> playlist?
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-around" style={{backgroundColor:'lightgrey'}}>
                    <Button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                        variant="contained">
                            Confirm
                    </Button>
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                        variant="contained">
                            Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
/*<div className="modal-dialog">
                <header className="dialog-header">
                    Delete the {name} Top 5 List?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>*/