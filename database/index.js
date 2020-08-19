const { Client } = require("pg");
const config = require("../config.json");
const {db} = new Client({
	user: db.user,
	host: db.host,
	database: db.database, 
	password:  db.password,
	port: db.port,
});
client.connect(function (err, res) {
	if (err) {
		console.log(err);
	} else {
		console.log("successfully connected to the database");
	}
});

module.exports = {
	requestTennis: async function (query, ...player) {
		try {
			const results = await client.query(query(...player));

			return results;
		} catch (err) {
			console.log(`something went wrong ${err}`);
		}
		// } finally {
		// 	await client.end();
		// 	console.log("client successfully closed");
		// }
	},
};
