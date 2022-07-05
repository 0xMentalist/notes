'use strict'

const getTitleElement = document.querySelector('#newNoteEdit');
const getBodyElement = document.querySelector('#descrip');
const getDeleteButton = document.querySelector('#deleteNote');
const dateStuff = document.querySelector('#updated');



const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let findNoteWithID = notes.find((thisNote) => thisNote.id === noteId);

if(!findNoteWithID){
    location.assign("index.html");
}

getTitleElement.value = findNoteWithID.title;
getBodyElement.value = findNoteWithID.body;
dateStuff.textContent = lastUpdated(findNoteWithID.updated);


//setiing up event listeners 

getTitleElement.addEventListener('input', function(e){
    findNoteWithID.title = e.target.value;
    findNoteWithID.updated = moment().valueOf();
  dateStuff.textContent = lastUpdated(findNoteWithID.updated);
    saveNotes(notes);
})

getBodyElement.addEventListener('input', function(e){
    findNoteWithID.body = e.target.value;
    findNoteWithID.updated = moment().valueOf();
   dateStuff.textContent = lastUpdated(findNoteWithID.updated);
    saveNotes(notes);
})

getDeleteButton.addEventListener('click', function(e){
    removeNote(noteId);
    saveNotes(notes);
    location.assign("index.html");
})

document.querySelector('#done').addEventListener('click', function(e){
    saveNotes(notes);
    location.assign("index.html");
})

window.addEventListener('storage', function(e){
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        findNoteWithID = notes.find(function(thisNote){
            return thisNote.id === noteId;
        });
        
        if(!findNoteWithID){
            location.assign("index.html");
        }
        
        getTitleElement.value = findNoteWithID.title;
        getBodyElement.value = findNoteWithID.body;
      dateStuff.textContent = lastUpdated(findNoteWithID.updated);

    }
})




