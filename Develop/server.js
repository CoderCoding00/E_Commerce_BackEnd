const express = require("express");
const routes = require("./routes");
// Import Sequelize and use it to connect to the database
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
// RUNS THE SERVER & THE DB CONNECTION
// *** CHANGE THE "force: false" to "true" TO DROP THE TABLES & RECREATE THEM (npm run seed)
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
