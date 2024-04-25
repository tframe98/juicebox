const express = require('express'); //opening  specific box called express and taking out a piece called express
const app = express(); //assembles express into a new piece called app
const authRoutes = require('./routes/auth'); //takes a piece called authRoutes from the box auth in the routes directory
const postRoutes = require('./routes/posts'); //takes a piece called postRoutes from the box posts in the routes directory

app.use((req, res, next) => { //adds a new section to the structure called middleware which takes incoming request and logs HTTP method and URL before sending them to the middleware
  console.log(`${req.method} ${req.url}`); //
  next();
});

app.use(express.json()); //JSON parses incoming request through the middleware section in the structure

app.use('/auth', authRoutes); //authRoute piece is used to handle authentication request, we're also adding a new section to the structure called auth
app.use('/api/posts', postRoutes); //same as line above but for postRoutes

app.use((err, req, res, next ) => { //another new section called middleware to log errors and send error messages
  console.error(err.stack);
  res.status(500).json({message: 'Something went wrong'});
});


const PORT = process.env.PORT || 3000; //this section in the structure we assemble a piece called PORT
app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});