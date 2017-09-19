
var lineup = []
var lineupQuantity = []

$( document ).ready(function() {
  Init()
  Calculate()
  list.sort(SortByScore)
  PrintScoreboard()
  DrawScoreboard()
  DrawLineup()
  DrawInfo()
  createGraph()
});

function Init() {
  AddLineup('TBA ')
}

function DrawScoreboard() {
  var content = '<table><tr><th>Name</th><th>Score</th></tr>'
  for(i=0; i < list.length; i++){
    content += '<tr><th>' + list[i].name + '</th><th>' + list[i].score + '</th></tr>'
  }
  content += '</table>'
  $('#scoreboard').append(content);
}

function DrawLineup() {
  var content = '<p>'
  for(i=0; i < lineup.length; i++){
    content += lineup[i] + ' '
  }
  content += '</p>'
  $('#lineup').append(content);
}

function DrawInfo() {
  var content = ''
  for(i=0; i < list.length; i++){
    content += '<p><b>' + list[i].name + '</b> '
    for (var j = 0; j < list[i].topArtist.length; j++) {
      content += list[i].topArtist[j] + ' '
    }
    content += '<i>'
    for (var j = 0; j < list[i].otherArtist.length; j++) {
      content += list[i].otherArtist[j] + ' '
    }
    content += '</i></p>'
  }
  $('#info').append(content);
}

function Calculate() {
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list[i].topArtist.length; j++) {
      for (var k = 0; k < lineup.length; k++) {
        if (list[i].topArtist[j] == lineup[k]) {
          AddPoints(1.5, i)
        }
      }
    }
    for (var j = 0; j < list[i].otherArtist.length; j++) {
      for (var k = 0; k < lineup.length; k++) {
        if (list[i].otherArtist[j] == lineup[k]) {
          AddPoints(1/lineupQuantity[k], i)
        }
      }
    }
  }
}

function SortByScore(a, b) {
  return b.score - a.score;
}

function AddPoints(points, i) {
  var pointsInt = parseInt(list[i].score)
  pointsInt += points;
  list[i].score = String(pointsInt)

  console.log(points + ' points to ' + list[i].name)
}

function AddLineup(artist){
  lineup.push(artist)
  var quantity = 0

  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list[i].otherArtist.length; j++) {
      if (list[i].otherArtist[j] == artist) {
        quantity++
      }
    }
  }

  lineupQuantity.push(quantity)

  console.log('Added ' + artist)
}

function PrintScoreboard() {
  console.log('==================================================')
  for (var i = 0; i < list.length; i++) {
    console.log('Name: ' + list[i].name + " Score: " + list[i].score)
  }
  console.log('==================================================')
}

function createGraph() {
    var names = new Array()
    var scores = new Array()
    var bgColors = []
    var bgBorders = []
    var r1, r2, r3;

    for (var i = 0; i < list.length; i++) {
        names[i] = list[i].name
        scores[i] = list[i].score
        r1 = (Math.floor(Math.random() * 255) + 1)
        r2 = (Math.floor(Math.random() * 255) + 1)
        r3 = (Math.floor(Math.random() * 255) + 1)
        bgColors.push('rgba(' + r1 + ', ' + r2 + ', ' + r3 + ', 0.8)')
        bgBorders.push('rgba(' + r1 + ', ' + r2 + ', ' + r3 + ', 1)')
    }

    var ctx = document.getElementById("scoreGraph");
    var myChart = new Chart(ctx,
        {
            type: 'bar',
            data: {
              labels: names,
              datasets: [{
		          data: scores,
		          backgroundColor: bgColors,
		          borderColor: bgBorders,
		          borderWidth: 2
		          }]
            },
            options: {
              legend: {
	            display: false
            },
            scales: {
	            yAxes: [{
		            ticks: {
			            beginAtZero: true
		            }
		        }]
	        }
        }
      }
	);
};
