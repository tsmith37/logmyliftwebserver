const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

require('dotenv').config()

const app = express();

var corsOptions = {
	origin: process.env.BASE_URL
};
app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

require('./routes/exercise.routes')(app);
require('./routes/workout.routes')(app);
require('./routes/lift.routes')(app);
require('./routes/maxWeight.routes')(app);
require('./routes/selectedExercise.routes')(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}..`));


