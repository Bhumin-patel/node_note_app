const fs = require('fs');
const chalk = require('chalk');

const addNote = (title,body) => {

    const notes=loadNotes();

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('Note Added'));
    } else {
        console.log(chalk.red.inverse('title is already taken!'))
    }
}

const removeNote = (title) => {
        const notes = loadNotes();
        const notesTokeep = notes.filter((note) => note.title !== title)

        if(notes.length > notesTokeep.length)
        {
            saveNotes(notesTokeep);
            console.log(chalk.green.inverse('Note Removed'));
        }
        else{
            console.log(chalk.red.inverse('No note found!'));
        }
}

const listNotes = () =>{
    const notes = loadNotes();

    console.log(chalk.inverse('Your Notes'));

    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) =>{
    const notes = loadNotes();
    const note = notes.find( (note) => note.title == title )

    if(note)
    {
        console.log('title - ' + note.title);
        console.log('body - ' + note.body);
    }
    else{
        console.log(chalk.red.inverse('Note not fonud!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}