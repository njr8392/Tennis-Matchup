const { Client } = require("pg");
const client = new Client({
//	FOR LOCAL CONNECTION ONLY
//	user: process.env.PGUSER,
//	host: process.env.HOST,
//	database: process.env.PGDATABASE, 
//	password:  process.env.PGPASSWORD,
//	 port: process.env.PGPORT,
	connectionString: process.env.DATABASE_URL,
	ssl: {
	 rejectUnauthorized: false
	}
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
