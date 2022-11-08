// LOWERCASE COMMENTS PROVIDED BY INSTRUCTOR
const express = require('express');
const routes = require('./routes');
// import sequelize connection
// USE CONST SEQUELIZE TO CONNECT TO THE DATABASE AND SYNC THE MODELS TO THE DATABASE TABLES 
const sequelize = require('./config/connection');

// CODE BELOW PROVIDED BY INSTRUCTOR
const app = express();
const PORT = process.env.PORT || 3001;

//CODE PROVIDED BY INSTRUCTOR. IS THIS CONSIDERED MIDDLWARE?????
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CODE PROVIDED BY INSTRUCTOR. USERS ROUTES FROM THE ROUTES FOLDER I THINK.
app.use(routes);

// sync sequelize models to the database, then turn on the server
// THIS RUNS THE SERVER & THE DB CONNECTION
// *** CHANGE THE "force: false" to "true" TO DROP THE TABLES & RECREATE THEM (npm run seed)
// MY CODE ON LINE 24
sequelize.sync({ force: false }).then(() => {
  // PROVIDED BY INSTRUCTOR
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
