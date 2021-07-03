// setting the dependecy of express
const { info } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

//creating an express server
const app = express();

// setting the port for later use
const PORT = process.env.PORT ||3000;

// used to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//this is pointing to the routes that will be needed
// this route will get the notes 
app.get('/api/notes', (req, res) => {
  try {
    const myNotes = JSON.parse(fs.readFileSync('./db/db.json'));

    return res.json(myNotes);
    
  } catch (err) {
    console.log(err)
  }
});

// this will post the notes to the db.json
app.post('/api/notes', (req, res) => {
  const info = JSON.parse(fs.readFileSync('./db/db.json'));
  const newNote = req.body;
 //  this gives the id to the notes created using the date as a id
newNote.id = Date.now();
//  console.log(newNote);
info.push(newNote);
fs.writeFileSync('./db/db.json', JSON.stringify(info));
res.json(info);
});

// this will delete the note fromt the db file
app.delete('/api/notes/:id', (req,res) => {
  const info = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf-8'));
  const removeNote = req.params.id;
  // this will remove the note by finding the id 
  const updatedNotes = info.filter(newNote => newNote.id != removeNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
  res.send(updatedNotes);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//check
// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT: http://localhost:${PORT}}`);
  });
  