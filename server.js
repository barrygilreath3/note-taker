const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();
const util = require('util');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Read/write functions
const readFile = util.promisify(fs.readFile)
function readNotes() {
  return readFile('db/db.json', 'utf-8').then(notes => {
    let notesArray = [];
    notesArray = notesArray.concat(JSON.parse(notes));
    return notesArray;
  });
}

app.get('/api/notes', (req, res) => {
  readNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err))
});

// Post a New Note
app.post('/api/notes', (req, res) => {  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text
      };
      readNotes().then(notes => [... notes, newNote]).then(newArray => {
        fs.writeFileSync('db/db.json', JSON.stringify(newArray));
      });
      res.json({
        ok:'true'
      })
    } else {
      res.error('Error in adding note');
    }
});

app.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);