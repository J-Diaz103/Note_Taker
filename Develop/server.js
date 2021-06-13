// setting the dependecy of express
const express = require('express');

//creating an express server
const app = express();

// setting the port for later use
const PORT = process.env.PORT ||3000

// used to parse the data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//this is pointing to the routes that will be needed

//check
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  