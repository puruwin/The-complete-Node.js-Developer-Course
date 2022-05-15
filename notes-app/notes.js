const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        console.log('New note added')
    } else {
        console.log('The note you are trying to create already exists.')
    }

    saveNotes(notes)
}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter((n) => n.title !== title)

    if (notesToKeep.length < notes.length) {
        console.log(chalk.bgGreen.black.bold('Note succesfuly removed.'))
    } else {
        console.log(chalk.bgRed.black.bold('There is no note titled ' + '\'' + title + '\''))
    }

    saveNotes(notesToKeep)
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue.black.bold('Your notes'))
    
    notes.forEach((note) => console.log(note.title))
}

const readNote = (noteTitle) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === noteTitle)
    console.log(noteToRead.body)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}