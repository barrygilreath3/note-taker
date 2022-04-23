const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes');
const PORT = 3001;
const app = express();
// var db = fs.readFile("./db/db.json");
// var dbjson = JSON.parse(db);

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

// Post a New Note
app.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text
      };
      
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);