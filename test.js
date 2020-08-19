const s = "7-6(5) 7-5";
const t = "4-6 6-4 2-0 RET"

const newString = t.split(" ");
var tmp=[];
for(let st of newString){
tmp.push(st.match(/[0-9]/g));
}
console.log(tmp);


const please = tmp.reduce(function (obj,score){
    if(score != null){
        obj['games_won'] += Number(score[0]);
        obj['games_lost'] += Number(score[1]);
    }
    return obj;
}, {'games_won':0, 'games_lost':0});

console.log(please);
