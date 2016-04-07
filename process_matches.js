var COUNTERS_ID = require('./data/champion_counters_id.json');
var matchesDir = './data/matches';
var jsonfile = require('jsonfile');
var fs = require('fs');


var checkCounter = function(champ, counter){
  var counters = COUNTERS_ID[champ];
  if (!counters){
    return 0;
  }
  if (counters.indexOf(counter) > -1){
    return -1;
  } else {
    counters = COUNTERS_ID[counter];
    if (!counters) return 0 ;
    if (counters.indexOf(champ) > -1){
      return 1;
    } else {
      return 0;
    }
  }
};

LEGAL_LANES = ['MIDDLE','BOTTOM','JUNGLE', 'TOP'];
DATA = {};
for (var key in COUNTERS_ID) {
  if (COUNTERS_ID.hasOwnProperty(key)) {
    DATA[key] = {};
    for (var i = 0; i < COUNTERS_ID[key].length; i++) {
      DATA[key][COUNTERS_ID[key][i]] = {win:0, total:0};
    }
  }
}

var computeMatch = function(match){
  var participants = match.participants;
  var counterPairs = [];
  var lanes = {100:{}, 200:{}};
  participants.forEach(function(p){
    var champion = p.championId;
    var team = p.teamId;
    var spells = [p.spell1Id, p.spell2Id];
    var lane = p.timeline.lane;
    if (spells[0] === 11 || spells[1] === 11){
      lanes[team].JUNGLE = champion;
    } else {
      if (lane === 'MID'){
        lane = 'MIDDLE';
      } else if (lane === 'BOT'){
        lane = 'BOTTOM';
      }
      lanes[team][lane] = champion;
    }
  });
  var winner = match.teams[0].winner ? match.teams[0].teamId : match.teams[1].teamId;
  LEGAL_LANES.forEach(function(l){
    var champ1 = lanes[100][l];
    var champ2 = lanes[200][l];
    var counterPoint = checkCounter(champ1, champ2);
    if (counterPoint < 0){
      if(winner === 100){
        console.log(champ1, champ2);
        DATA[champ1][champ2].win += 1;
        DATA[champ1][champ2].total +=1;
      } else {
        DATA[champ1][champ2].total +=1;
      }
    }
    else if (counterPoint > 0){
      if (winner === 200){
        console.log(champ2, champ1);
        DATA[champ2][champ1].win += 1;
        DATA[champ2][champ1].total +=1;
      } else {
        DATA[champ2][champ1].total +=1;
      }
    }
  });
};
for (var i = 1; i < 11; i++){
  var MATCHES = require(matchesDir+i+'.json');
  for (var j = 0; j < MATCHES.matches.length; j++) {
    computeMatch(MATCHES.matches[j]);
  }
}
jsonfile.writeFile('./data/prelim_result.json', DATA, function(err){
  console.error(err);
})
