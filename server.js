const express = require('express');
const bodyparser = require('body-parser');
// const cors = require('cors');

const app = express();

// var corsOptions = {
// 	origin: "http://localhost:8081"	
// };
// app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

require('dotenv').config()
require('./routes/exercise.routes')(app);
require('./routes/workout.routes')(app);
require('./routes/lift.routes')(app);
require('./routes/maxWeight.routes')(app);
require('./routes/selectedExercise.routes')(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}..`));


