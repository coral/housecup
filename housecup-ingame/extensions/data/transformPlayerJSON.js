var data = require('./players.json');
var fs = require('fs');

for (var i in data) {
  data[i].age = 0;
  data[i].team = "";
  data[i].image = "";
  data[i].country = "";
  data[i].wins = "";
  data[i].favorite_class = "";
  data[i].most_hated_card = "";
  data[i].previous_tournaments = [
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      },
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      },
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      },
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      },
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      },
      {
          "tournament": "",
          "placement": 0,
          "prize": 0,
          "date": "2015-02-22"
      }
  ];
  delete  data[i].decks;




}

fs.writeFileSync("playerstats.json", JSON.stringify(data, null, 4));
