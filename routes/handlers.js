// This file is for functions that transform the queried data into a format to meet Highchart js 's format

module.exports = {
	winReducer: function winReducer(arr) {
		return arr.map((item) => Number(item));
	},

	surfaceReducer: function surfaceReducer(arr) {
		let surface = [];
		for (item of arr) {
			surface.push(item.surface);
		}
		return surface;
	},

	rearrange: function (arr) {
		let arr1 = [];
		let arr2 = [];
		let obj = [];
		let p1 = arr[arr.length / 2 - 1];
		let p2 = arr[arr.length - 1];

		for (let i = 0; i < arr.length; i++) {
			if (i == 0) {
				for (let j = 0; j < arr[i].length; j++) {
					arr1.push(Number(arr[i][j].winpercentage));
				}
				let y = { name: p1, data: arr1 };
				obj.push(y);
			} else if (i == 2) {
				for (let j = 0; j < arr[i].length; j++) {
					arr2.push(Number(arr[i][j].winpercentage));
				}
				let z = { name: p2, data: arr2 };
				obj.push(z);
			}
		}

		return obj;
	},
	//  create a dictionary from the query array {winTotal: '' Loss Total: '' totalGames: '', straightWins:'', straight losses: '', 3set wins:}
	setReducer: function (arr, player) {
		return arr.reduce(
			function (obj, stat) {
				if (stat.winner_name == player) {
					obj["winTotal"]++;
					if ((stat.score.match(/-/g) || []).length == 2) {
						obj["straightsetWins"]++;
					}
				} else {
					obj["lossTotal"] += 1;
					if ((stat.score.match(/-/g) || []).length == 2) {
						obj["straightsetLosses"]++;
					}
				}
				obj["player"] = player;
				obj["totalGames"]++;
				return obj;
			},
			{
				totalGames: 0,
				winTotal: 0,
				straightsetWins: 0,
				lossTotal: 0,
				straightsetLosses: 0,
				player: "",
			}
		);
	},

	last10Reducer: function (arr, player) {
		let newarr = [];
		return arr.reduce(
			function (obj, current) {
				newarr.push(current);
				obj["player"] = player;
				obj["data"] = newarr;
				return obj;
			},
			{ player: "", data: [] }
		);
	},

	// had it as countign dynamically, but had to order it and include all possibles numbers for purposes of graphing
	win_loss_margin_reducer: function (arr, gameTotals, player) {
		let spread = {
			"-12": 0,
			"-11": 0,
			"-10": 0,
			"-9": 0,
			"-8": 0,
			"-7": 0,
			"-6": 0,
			"-5": 0,
			"-4": 0,
			"-3": 0,
			"-2": 0,
			"-1": 0,
			"0": 0,
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0,
			"5": 0,
			"6": 0,
			"7": 0,
			"8": 0,
			"9": 0,
			"10": 0,
			"11": 0,
			"12": 0,
		};
		for (let row of arr) {
			let games = gameTotals(row.score);
			// subtract game loss from game ones to make it look like a spread ie if -4 then player won by 4 games
			// return of object of it with a count of occurences
			let match_spread = games.games_lost - games.games_won;
			if (row.winner_name === player) {
				spread[match_spread]++;
			} else {
				spread[match_spread * -1]++;
			}
		}
		return spread;
	},

	// returns total won games and total loss games in an object {win: 9 loss:5}
	gameTotals: function (string) {
		const newString = string.split(" ");
		var tmp = [];
		for (let st of newString) {
			tmp.push(st.match(/[0-9]/g));
		}

		const please = tmp.reduce(
			function (obj, score) {
				if (score != null) {
					obj["games_won"] += Number(score[0]);
					obj["games_lost"] += Number(score[1]);
				}

				return obj;
			},
			{ games_won: 0, games_lost: 0 }
		);

		return please;
	},
};
