const { Client } = require("pg");
const db = new Client({
	user: process.env.PGUSER,
	host: process.env.HOST,
	database: proces.env.PGDATABASE, 
	password:  proces.env.PGPASSWORD,
	port: PGPORT,
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
