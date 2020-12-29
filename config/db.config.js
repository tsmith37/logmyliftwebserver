require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
	host:DB_HOST,
    user:DB_USERNAME,
    password:DB_PASSWORD,
    db:'LogMyLiftPostgresDb',
	dialect:'postgres',
    multipleStatements:true
};

