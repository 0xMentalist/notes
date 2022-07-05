'use strict'

// Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')
    try{
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
    }
    catch (e){
        return []
    }
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const button = document.createElement('button')
    const statusEl = document.createElement('p')
    

    // Setup the remove note button
    button.textContent = 'Quick Remove'
    button.classList.add('button--secondary')
   // noteEl.appendChild(button)
    button.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Setup the note title text
    note.title.length > 0 ? textEl.textContent = note.title : textEl.textContent = 'Unnamed note'
    noteEl.href = `edit.html#${note.id}`

    textEl.classList.add('list-item__title')

    statusEl.textContent = lastUpdated(note.updated)
    statusEl.classList.add('list-item__subtitle')

    noteEl.classList.add('list-item')
    noteEl.appendChild(textEl)
    noteEl.appendChild(statusEl)
    noteEl.appendChild(button)

    return noteEl
}

// Sort Notes



const sorted = (notes, sortMethod) => {
    if (sortMethod === 'byEdited'){
        return notes.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortMethod === 'byCreated'){
        return notes.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
} else if (sortMethod === 'alphabetical'){
    return notes.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1
        } else {
            return 0
        }
    })
}

else {
    return notes;
}
}


// Render application notes
const renderNotes = (notes, filters) => {

   notes = sorted(notes, filters.sortThis);
  
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''
    if(filteredNotes.length > 0 ){
    filteredNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        noteEl.classList.add('list-item__title')
        document.querySelector('#notes').appendChild(noteEl)
    })
} else{
    let emptyNote = document.createElement('p')
    emptyNote.classList.add('empty-message')
    emptyNote.textContent = 'Do something! Create a note now.'
    document.querySelector('#notes').appendChild(emptyNote)
}
}

// Generate Last Updated

const lastUpdated = (ts) => `Last Edited ${moment(ts).fromNow()}`;