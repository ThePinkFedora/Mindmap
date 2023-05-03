require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { PORT } = process.env || { PORT: 8080 };

//Routers
const mapsRouter = require('./routes/mapsRouter');
// const nodesRouter = require('./routes/nodesRouter');
// const linksRouter = require('./routes/linksRouter');
// const fieldsRouter = require('./routes/fieldsRouter');


app.use(require('./middleware/logRequests'));
app.use(express.json());
app.use(cors());
app.use('/maps',mapsRouter);
// app.use('/nodes',nodesRouter);
// app.use('/links',linksRouter);
// app.use('/fields',fieldsRouter);


app.listen(PORT, () => console.log("Server is running | " + new Date()));