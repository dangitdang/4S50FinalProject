var APIKEY = '59d616e7-2c52-405b-83ed-537f4ee3658c';
var DATA;
var ID_TO_CHAMP;
var imgBase = 'http://ddragon.leagueoflegends.com/cdn/6.7.1/img/champion/';
var DATA_TO_DRAW;
var displayCounters = function(id){
  var matchesResults = DATA[id];
  var dataToBeDisplay = [];
  for (var key in matchesResults){
    if (matchesResults.hasOwnProperty(key)){
      var result = matchesResults[key];
      if (result.total === 0) continue;
      var image = loadImage(imgBase+ID_TO_CHAMP[key]+'.png');
      dataToBeDisplay.push({counter: key, win: result.win, total: result.total, image: image});
    }
  }
  console.log(dataToBeDisplay);
  DATA_TO_DRAW = {champion : id, data: dataToBeDisplay};
};

function setup() {
  var canvas = createCanvas(windowWidth,1200);
  canvas.parent('p5');

  $.ajax({
    dataType : 'json',
    url  : 'data/prelim_result.json',
    success : function(data){
      DATA = data;
    }
  });

  $.ajax({
    dataType : 'json',
    url : 'data/champion_by_id.json',
    success : function(data){
      ID_TO_CHAMP = data;
      for (var key in ID_TO_CHAMP) {
        if (ID_TO_CHAMP.hasOwnProperty(key)) {
          $('.champions-grid').append($("<li>",{
            class: 'champion',
            id: key,
            html: $("<img>", {src: imgBase+ID_TO_CHAMP[key]+'.png'})
          }));
        }
      }
      $('.champion').on('click',function(e){
        var id = $(this).attr('id');
        displayCounters(id);
      });
    }
  });
}

function draw() {
  if (DATA_TO_DRAW) {
    background(255,255,255);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text('Countering:'+ ' ' + ID_TO_CHAMP[DATA_TO_DRAW.champion], width/2,30);
    push();
    DATA_TO_DRAW.data.forEach(function(counter, i){
      var x = map(i,
                  0, DATA_TO_DRAW.data.length,
                  200, windowWidth-200);
      image(counter.image, x, 100, 60, 60);
      fill('#469B4C');
      var bar_height = map(counter.total - counter.win, 0, counter.total, 0, 400);
      rect(x,190,60,bar_height);
      fill('#BE4747');
      var lose_height = map(counter.win, 0, counter.total, 0, 400);
      rect(x,190+bar_height,60, lose_height);
      fill(0);
      textAlign(CENTER,CENTER);
      textSize(20);
      var annouce = counter.total-counter.win+ '/' + counter.total + ' games won';
      text(annouce, x+30, 170);
    });
    pop();
  }
}
