module.exports = {
	surfaceQuery: function (player) {
		return {
			text: `SELECT surface,
SUM(CASE WHEN winner_name=$1 OR loser_name = $1 THEN 1 ELSE 0 END) AS totalGames,
   SUM(CASE WHEN winner_name=$1 THEN 1 ELSE 0 END) AS Wins,
   SUM(CASE WHEN loser_name=$1 THEN 1 ELSE 0 END) AS Losses,
   round(SUM(CASE WHEN winner_name = $1 THEN 1 ELSE 0 END)*100.00/SUM(CASE WHEN winner_name=$1 or loser_name = $1 THEN 1 ELSE 0 END),2) AS WinPercentage
FROM matches
GROUP BY surface
 ORDER BY surface`,
			values: [player],
		};
	},
	headtohead: function (player1, player2) {
		return {
			text: `SELECT winner_name, loser_name, score, CONCAT(date_part('year', tourney_date), ' ', tourney_name, ' ', round) as date
			FROM matches
			WHERE (winner_name = $1 AND  loser_name= $2)
			OR (winner_name = $2 AND loser_name = $1);`,
			values: [player1, player2],
		};
	},
	numberOfSets: function (player) {
		return {
			text: `select winner_name, loser_name, score, tourney_date,
		SUM(CASE WHEN winner_name=$1 THEN 1 ELSE 0 END) AS Wins,
		 SUM(CASE WHEN loser_name=$1 THEN 1 ELSE 0 END) AS Losses
		from matches
		where winner_name = $1 or loser_name =$1
		group by score, winner_name, loser_name, tourney_date`,
			values: [player],
		};
	},
	lastTenMatches: function (player){
		return{
			text: `SELECT winner_name, loser_name, score, CONCAT(date_part('year', tourney_date), ' ', tourney_name, ' ', round) as date, winner_rank, loser_rank, tourney_date
			FROM matches
			WHERE winner_name = $1 or loser_name = $1
			ORDER BY tourney_date DESC
			LIMIT 10;`, values: [player]
		}
	},
	win_loss_margin: function(player){
		return{
			text: `SELECT winner_name, loser_name, score
			FROM matches
			WHERE winner_name =$1 or loser_name =$1`, values: [player]
		}
	},

};
