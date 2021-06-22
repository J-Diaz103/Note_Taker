// setting the dependecy of express
const express = require('express');
const fs = require('fs');
const path = require('path');
const path = require(path);

//creating an express server
const app = express();

// setting the port for later use
const PORT = process.env.PORT ||3000

// used to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//this is pointing to the routes that will be needed
// this route will get the notes 
app.get('api/notes', (req, res) => {
  try {
    const myNotes = JSON.parse(fs.readFileSync('./db/db.json'));

    return res.json(myNotes);
    
  } catch (err) {
    console.log(err)
  }
});



//check
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  