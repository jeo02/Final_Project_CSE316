import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    PUBLISH_LIST: "PUBLISH_LIST",
    LOAD_DIFFERENT_LISTS: "LOAD_DIFFERENT_LISTS",
    SORT_LISTS: "SORT_LISTS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

const CurrentListScreen = {
    HOME: "HOME",
    ALL_USERS: "ALL_USERS",
    ALL_LISTS: "ALL_LISTS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {

     // HANDLE KEY PRESSES. UNDO IF CTRL+Z, REDO IF CTRL+Y
     const handleKeyPress = useCallback((event) => {
        if (event.ctrlKey) {
            if (event.key === 'z') {
                store.undo()
            }
            if (event.key === 'y') {
                store.redo()
            }
        }
    }, []);

    useEffect(() => {
        // ATTACH THE EVENT LISTENER
        document.addEventListener('keydown', handleKeyPress);

        // REMOVE THE EVENT LISTENER
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        currentListScreen: CurrentListScreen.HOME,
        searchBarText: null
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log(type);
        console.log(payload);
        console.log(store.currentModal);
        console.log(store.currentListScreen)
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                })
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: payload,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                });
            }
            case GlobalStoreActionType.PUBLISH_LIST:{
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                })
            }
            case GlobalStoreActionType.LOAD_DIFFERENT_LISTS:{
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: payload.screen,
                    searchBarText: payload.text
                })
            }
            case GlobalStoreActionType.SORT_LISTS:{
                return setStore({
                    currentModal: CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentListScreen: store.currentListScreen,
                    searchBarText: store.searchBarText
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        if(store.currentListScreen === "HOME"){
                            store.listScreenHome("");
                        }
                        else if(store.currentListScreen === "ALL_LISTS"){
                            store.listScreenAll("");
                        }
                        else{
                            store.listScreenUsers("");
                        }
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled";
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.userName, false, [], [], 0, []);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
        store.loadIdNamePairs();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        console.log("bruh", auth.user)
        if(auth.user && auth.user.userName === "guest"){
            store.listScreenAll("");
        }
        else{
            if(store.currentListScreen === "HOME"){
                store.listScreenHome("");
            }
            else if(store.currentListScreen === "ALL_LISTS"){
                store.listScreenAll("");
            }
            else{
                store.listScreenUsers("");
            }
        }
        
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.loadIdNamePairs();
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateComments = function(comment){
        let list = store.currentList;
        let comments = list.comments;
        comments.push(comment);

        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }

    store.publish = async function(id){
        // Update the list
        async function asyncGetList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.published = true;
                playlist.publishedOn = new Date();
                async function updateList(playlist) {
                    let response = await api.updatePlaylistById(playlist._id, playlist);
                }
                await updateList(playlist);
            }
        }
        // Wait until this function finishes
        await asyncGetList(id);

        //Now load the updated name pairs
        store.loadIdNamePairs();

        // Set the current list to the updated version
        async function publishList(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.PUBLISH_LIST,
                    payload: {
                        currentList: response.data.playlist
                    }
                });
            }
        }
        publishList(id)
    }

    store.likeList = async function(id){
        // GET THE LIST
        async function asyncPublishList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                //Makes sure we dont let the same user like/dislike more than once
                let likes = new Set(playlist.likes);
                let dislikes = new Set(playlist.dislikes);
                let userName = auth.user.userName;
                if(dislikes.has(userName)){
                    dislikes.delete(userName);
                }
                if(likes.has(userName)){
                    likes.delete(userName);
                }
                else{
                    likes.add(userName);
                }
                
                playlist.likes = [...likes]
                playlist.dislikes = [...dislikes]
                async function updateList(playlist) {
                    let response = await api.updatePlaylistById(playlist._id, playlist);
                }
                await updateList(playlist);
            }
        }
        await asyncPublishList(id);

        //Now load the updated name pairs
        store.loadIdNamePairs();
    }

    store.dislikeList = async function(id){
        // GET THE LIST
        async function asyncPublishList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                //Makes sure we dont let the same user like/dislike more than once
                let likes = new Set(playlist.likes);
                let dislikes = new Set(playlist.dislikes);
                let userName = auth.user.userName;
                if(likes.has(userName)){
                    likes.delete(userName);
                }

                if(dislikes.has(userName)){
                    dislikes.delete(userName);
                }
                else{
                    dislikes.add(userName);
                }
                
                playlist.likes = [...likes]
                playlist.dislikes = [...dislikes]
                async function updateList(playlist) {
                    let response = await api.updatePlaylistById(playlist._id, playlist);
                }
                await updateList(playlist);
            }
        }
        await asyncPublishList(id);

        store.loadIdNamePairs();
    }

    store.undo = function () {
        if (store.currentModal === CurrentModal.NONE)
            tps.undoTransaction();
    }
    store.redo = function () {
        if (store.currentModal === CurrentModal.NONE)
            tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return ((store.currentList !== null) && store.currentModal === CurrentModal.NONE);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo() && store.currentModal === CurrentModal.NONE);
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo() && store.currentModal === CurrentModal.NONE);
    }
    store.canClose = function() {
        return ((store.currentList !== null) && store.currentModal === CurrentModal.NONE);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: !store.listNameActive
        });
    }

    store.listScreenHome = async function(name){
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistUserPairs(name);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let text = null;
                if(name != ""){
                    text = name;
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_DIFFERENT_LISTS,
                    payload: {
                        screen: CurrentListScreen.HOME, 
                        idNamePairs: pairsArray,
                        text: text }
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.listScreenAll = async function(name){
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistAllPairs(name);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let text = null;
                if(name != ""){
                    text = name;
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_DIFFERENT_LISTS,
                    payload: {
                        screen: CurrentListScreen.ALL_LISTS, 
                        idNamePairs: pairsArray,
                        text: text }
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.listScreenUsers = async function(userName){
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistAllUserPairs(userName);
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                let text = null;
                if(userName != ""){
                    text = userName;
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_DIFFERENT_LISTS,
                    payload: {
                        screen: CurrentListScreen.ALL_USERS, 
                        idNamePairs: pairsArray,
                        text: text }
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.sortByName = function(){
        let listData = [...store.idNamePairs];

        listData.sort((a, b) => {
            if(a.name > b.name){
                return 1;
            }
            else if(a.name < b.name){
                return -1;
            }
            else{
                return 0;
            }
        })

        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:{
                idNamePairs: listData
            }
        })
    }

    store.sortByPublishedDate = function(){
        let listData = [...store.idNamePairs];

        listData.sort((a, b) => {
            if(!a.published && !b.published){
                return 0;
            }
            else if(a.published && !b.published){
                return -1;
            }
            else if(!a.published && b.published){
                return 1;
            }
            else{
                let aDate = new Date(a.publishedOn);
                let bDate = new Date(b.publishedOn);
                if(aDate > bDate){
                    return -1;
                }
                else if(aDate < bDate){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            
        })

        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:{
                idNamePairs: listData
            }
        })
    }

    store.sortByListens = function(){
        let listData = [...store.idNamePairs];

        listData.sort((a, b) => {
            if(!a.published && !b.published){
                return 0;
            }
            else if(a.published && !b.published){
                return -1;
            }
            else if(!a.published && b.published){
                return 1;
            }
            else{
                if(a.views > b.views){
                    return -1;
                }
                else if(a.views < b.views){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        })

        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:{
                idNamePairs: listData
            }
        })
    }

    store.sortByLikes = function(){
        let listData = [...store.idNamePairs];

        listData.sort((a, b) => {
            if(!a.published && !b.published){
                return 0;
            }
            else if(a.published && !b.published){
                return -1;
            }
            else if(!a.published && b.published){
                return 1;
            }
            else{
                if(a.likes.length > b.likes.length){
                    return -1;
                }
                else if(a.likes.length < b.likes.length){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        })

        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:{
                idNamePairs: listData
            }
        })
    }

    store.sortByDislikes = function(){
        let listData = [...store.idNamePairs];

        listData.sort((a, b) => {
            if(!a.published && !b.published){
                return 0;
            }
            else if(a.published && !b.published){
                return -1;
            }
            else if(!a.published && b.published){
                return 1;
            }
            else{
                if(a.dislikes.length > b.dislikes.length){
                    return -1;
                }
                else if(a.dislikes.length < b.dislikes.length){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        })

        storeReducer({
            type: GlobalStoreActionType.SORT_LISTS,
            payload:{
                idNamePairs: listData
            }
        })
    }


    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };