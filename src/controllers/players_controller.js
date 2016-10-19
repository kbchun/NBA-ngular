indexApp.controller('players.controller', function($scope, $routeParams, TeamPlayerInfo) {
  $scope.playerName;
  $scope.team = $routeParams.team;
  $scope.player_data = [];
  $scope.single_player_data;
  $scope.show_player_bool = false;

  $scope.filterName = function() {
    var name = $routeParams.name.replace('_', ' ');
    var gapName = name.indexOf(' ');
    if (gapName !== -1) {
      var firstName = name.slice(0, gapName);
      firstName = firstName[0].toUpperCase() + firstName.slice(1);
      var lastName = name.slice(gapName + 1);
      lastName = lastName[0].toUpperCase() + lastName.slice(1);
      $scope.playerName = firstName + ' ' + lastName;
      TeamPlayerInfo.getPlayerProfile(firstName.toLowerCase(), lastName.toLowerCase())
        .then(function(players) {
          if (players.data.length === 0) {
            console.log('Invalid player submitted.');
          } else {
            // display players
            for (var i = 0; i < players.data.length; i++) {
              players.data[i]['pic'] = 'http://stats.nba.com/media/players/230x185/' + players.data[i].id + '.png';
              $scope.player_data.push(players.data[i]);
            }
          }
        });

    // just one name given
    } else {
      $scope.playerName = name[0].toUpperCase() + name.slice(1);

      // if no team given
      if ($scope.team === '_') {
        TeamPlayerInfo.getPlayerProfile(name.toLowerCase())
          .then(function(players) {
            if (players.data.length === 0) {
              console.log('Invalid player submitted.');
            } else {
              // display players
              for (var i = 0; i < players.data.length; i++) {
                players.data[i]['pic'] = 'http://stats.nba.com/media/players/230x185/' + players.data[i].id + '.png';
                $scope.player_data.push(players.data[i]);
              }
            }
          });

        TeamPlayerInfo.getPlayerProfile(undefined, name.toLowerCase())
          .then(function(players) {
            if (players.data.length === 0) {
              console.log('Invalid player submitted.');
            } else {
              // display players
              for (var i = 0; i < players.data.length; i++) {
                players.data[i]['pic'] = 'http://stats.nba.com/media/players/230x185/' + players.data[i].id + '.png';
                $scope.player_data.push(players.data[i]);
              }
            }
          });

      // filter by team
      } else {
        var teamId = window.teamIds[window.teamNames.indexOf($scope.team)];
        TeamPlayerInfo.getPlayerProfile(name.toLowerCase(), undefined, teamId)
          .then(function(players) {
            if (players.data.length === 0) {
              console.log('Invalid player submitted.');
            } else {
              // display players
              for (var i = 0; i < players.data.length; i++) {
                players.data[i]['pic'] = 'http://stats.nba.com/media/players/230x185/' + players.data[i].id + '.png';
                $scope.player_data.push(players.data[i]);
              }
            }
          });

        TeamPlayerInfo.getPlayerProfile(undefined, name.toLowerCase(), teamId)
          .then(function(players) {
            if (players.data.length === 0) {
              console.log('Invalid player submitted.');
            } else {
              // display players
              for (var i = 0; i < players.data.length; i++) {
                players.data[i]['pic'] = 'http://stats.nba.com/media/players/230x185/' + players.data[i].id + '.png';
                $scope.player_data.push(players.data[i]);
              }
            }
          });
      }
    }
    $scope.show_player_bool = true;
  };

  $scope.playerDetails = function(player, i) {
    $('div').removeClass('bold');
    $(`div #${i['$index']}`).addClass('bold');
    console.log($scope.player_data[i['$index']]);
    TeamPlayerInfo.getPlayersStats(undefined, $scope.player_data[i['$index']].id)
      .then(function(data) {
        $scope.single_player_data = data.data;
      });
  };

  $scope.filterName();
});

indexApp.directive('gamePlayerInfo', function() {
  return {
    template: `
      <table class="highlight col s12">
        <thead>
          <tr>
          <th align="left"></th>
          <th align="center"></th>
          <th align="right"></th>
          <th align="left"></th>
          <th align="right"></th>
          <th align="left"></th>
          <th align="right"></th>
          <th align="left"></th>
          <th align="center"></th>
          <th align="center"></th>
          <th align="center"></th>
          <th align="center"></th>
          <th align="center"></th>
          <th align="center"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center"><strong>PTS</strong></td>
            <td align="right"><strong>FGM</strong></td>
            <td align="center"><strong>FGA</strong></td>
            <td align="left"><strong>FG%</strong></td>
            <td align="right"><strong>3PM</strong></td>
            <td align="center"><strong>3PA</strong></td>
            <td align="left"><strong>3P%</strong></td>
            <td align="right"><strong>FTM</strong></td>
            <td align="center"><strong>FTA</strong></td>
            <td align="left"><strong>FT%</strong></td>
            <td align="center"><strong>OREB</strong></td>
            <td align="center"><strong>DREB</strong></td>
            <td align="center"><strong>REB</strong></td>
            <td align="center"><strong>AST</strong></td>
            <td align="center"><strong>STL</strong></td>
            <td align="center"><strong>BLK</strong></td>
            <td align="center"><strong>TO</strong></td>
            <td align="center"><strong>PF</strong></td>
            <td align="center"><strong>+/-</strong></td>
          </tr>
          <tr ng-repeat="game in single_player_data">
            <td align="center">{{game.pts}}</td>
            <td align="right">{{game.fgm}}</td>
            <td align="center">{{game.fga}}</td>
            <td align="left">{{game.fga !== 0 ? (game.fgm / game.fga).toFixed(2) : 0}}</td>
            <td align="right">{{game.fg3m}}</td>
            <td align="center">{{game.fg3a}}</td>
            <td align="left">{{game.fg3a !== 0 ? (game.fg3m / game.fg3a).toFixed(2) : 0}}</td>
            <td align="right">{{game.ftm}}</td>
            <td align="center">{{game.fta}}</td>
            <td align="left">{{game.fta !== 0 ? (game.ftm / game.fta).toFixed(2) : 0}}</td>
            <td align="center">{{game.oreb}}</td>
            <td align="center">{{game.dreb}}</td>
            <td align="center">{{game.oreb + game.dreb}}</td>
            <td align="center">{{game.ast}}</td>
            <td align="center">{{game.stl}}</td>
            <td align="center">{{game.blk}}</td>
            <td align="center">{{game.to}}</td>
            <td align="center">{{game.pf}}</td>
            <td align="center">{{game.plus_minus}}</td>
          </tr>
        </tbody>
      </table>
    `
  };
});