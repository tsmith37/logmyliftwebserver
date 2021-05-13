const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

require('dotenv').config()

const db = require('./models');
db.sequelize.sync();

require('./routes/exercise.routes')(app);
require('./routes/workout.routes')(app);
require('./routes/lift.routes')(app);
require('./routes/maxWeight.routes')(app);
require('./routes/selectedExercise.routes')(app);
require('./routes/userSettings.routes')(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}..`));


