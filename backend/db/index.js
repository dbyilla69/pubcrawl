require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

const poolConfig = {
	connectionLimit: 20,
	user: process.env.CRAWLER_DB_USERNAME,
	host: process.env.CRAWLER_DB_HOST,
	database: process.env.CRAWLER_DB_DATABASE,
	password: process.env.CRAWLER_DB_PASSWORD,
	port: process.env.CRAWLER_DB_PORT,
	supportBigNumbers: true,
};

const clusterConfig = {
	removeNodeErrorCount: 1,
	restoreNodeTimeout: 0,
	canRetry: true,
};

const cluster = mysql.createPoolCluster(clusterConfig);
[...Array(15)].forEach(() => cluster.add(poolConfig));

const getConnection = util.promisify(cluster.getConnection).bind(cluster);

module.exports = {
	query: async (sql, values) => {
		try {
			const connection = await getConnection('*');
			const query = util.promisify(connection.query).bind(connection);

			const results = await query(sql, values);

			connection.release();

			return results;
		} catch (error) {
			return error;
		}
	},
};
