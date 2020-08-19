const express = require("express");
const Router = require("express-promise-router");
const db = require("../database/index");
const search = require("../database/queries/searches");
const router = new Router();
const handler = require("./handlers");

// home page
router.get("/", function (req, res) {
	res.render("home.ejs");
});

// render the matchup page
router.get("/matches/:p1-:p2", async function (req, res) {
	let player1 = req.params.p1;
	let player2 = req.params.p2;
	let match = [player1, player2];
	let data = [];
	let set_data = [];
	let lTen_data = [];
	for await (player of match) {
		const { rows } = await db
			.requestTennis(search.surfaceQuery, player)
			.catch((err) => {
				res.send(
					"Unable to retrieve the requested data please try another player"
				);
			});
		const winData = await db.requestTennis(search.numberOfSets, player);
		set_data.push(handler.setReducer(winData.rows, player));
		const lastTen = await db.requestTennis(search.lastTenMatches, player);
		lTen_data.push(handler.last10Reducer(lastTen.rows, player));
		data.push(rows, player);
	}
	// console.log(lTen_data);
	let h2h = await db.requestTennis(search.headtohead, player1, player2);
	// console.log(set_data)

	let players = handler.rearrange(data);
	res.render("match.ejs", {
		players: players,
		h2h: h2h.rows,
		set_data: set_data,
		lTenmatches: lTen_data,
	});
});

router.get("/matches/:p1-:p2/margin", async function (req, res) {
	let player1 = req.params.p1;
	let player2 = req.params.p2;
	let match = [player1, player2];
	let obj={}
	for await (player of match) {
		let { rows } = await db.requestTennis(search.win_loss_margin, player);
		let data = handler.win_loss_margin_reducer(rows, handler.gameTotals, player)
		if(!obj[player]){
			obj[player] = data;
		}
	
	}
	// returns an object of margin of victory or loss for each queried player
	console.log(obj);
	res.render('margin-spread.ejs', {spread: obj, player: match});
});

router.post("/", function (req, res) {
	let p1 = req.body.player1;
	let p2 = req.body.player2;
	res.redirect("/matches/" + p1 + "-" + p2);
});

router.get("/about", function (req, res) {
	res.render("about.ejs");
});

module.exports = router;
