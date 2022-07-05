'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortThis: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
    let x = uuidv4();
    let ts1 = moment().valueOf();
    notes.push({
        created: ts1,
        updated: ts1,
        id: x,
        title: '',
        body: ''
    })
    console.log(x);
    location.assign(`edit.html#${x}`);
    saveNotes(notes)
    renderNotes(notes, filters)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortThis = e.target.value;
    renderNotes(notes, filters);
})

window.addEventListener('storage', function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes,filters);
    }
})

