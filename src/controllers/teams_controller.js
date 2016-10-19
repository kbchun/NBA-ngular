indexApp.controller('teams.controller', function($scope, $routeParams, TeamPlayerInfo) {
  $scope.teamName = $routeParams.team;
  $scope.teamId;
  $scope.teamRoster = [];
  $scope.show_team_bool = false;
  
  $scope.gameIds = [];
  $scope.all_games_data = [];
  $scope.game_headers = [];

  $scope.team_stats;

  $scope.opponent_stats;
  $scope.opponentName = '';
  $scope.opponentId;
  $scope.opponentRoster = [];

  $scope.allPlayers = [];

  $scope.show_game_bool = false;

  $scope.show_roster_bool = false;

  $scope.displayTeam = function() {
    TeamPlayerInfo.getTeamGameIds($scope.teamName.toLowerCase())
      .then(function(teamData) {
        if (teamData.data.length === 0) {
          console.log('Invalid team submitted.');
          return;
        }
        $scope.all_games_data = teamData.data;
        $scope.teamName = TeamPlayerInfo.getTeamName();
        $scope.gameIds = $scope.all_games_data.map(function(game) { return game.game_id; });
        $scope.gameIds.map(function(id) {
          TeamPlayerInfo.getTeamHeader(id)
            .then(function(game) {
              if (game.data[0].date) {
                $scope.game_headers.push(game);
              }
            });
        });
      })
      .then(function() {
        $scope.teamId = $scope.all_games_data[0].team_id;
        $scope.show_team_bool = true;
      });
  };

  $scope.displayOpponent = function(game) {
    var awayTeam = window.teamNames[window.teamIds.indexOf(game.data[0].away_id)];
    var homeTeam = window.teamNames[window.teamIds.indexOf(game.data[0].home_id)];
    if (awayTeam === $scope.teamName.toLowerCase()) {
      return 'Away @ ' + homeTeam[0].toUpperCase() + homeTeam.slice(1);
    } else {
      return 'Home vs ' + awayTeam[0].toUpperCase() + awayTeam.slice(1);
    }
  };

  $scope.gameDetails = function(game, i) {
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
    $('div').removeClass('bold');
    $(`div #${i['$index']}`).addClass('bold');
    TeamPlayerInfo.getGameBoxscore(game.data[0].id)
      .then(function(boxscore) {
        if (boxscore.data[0].team_id === $scope.teamId) {
          $scope.team_stats = boxscore.data[0];
          $scope.opponent_stats = boxscore.data[1];
          $scope.opponentId = $scope.opponent_stats.team_id;
        } else {
          $scope.opponent_stats = boxscore.data[0];
          $scope.team_stats = boxscore.data[1];
          $scope.opponentId = $scope.opponent_stats.team_id;
        }

        var oppoIndex = window.teamIds.indexOf($scope.opponentId);
        var oppo = window.teamNames[oppoIndex];

        TeamPlayerInfo.getPlayersStats($scope.gameIds[i['$index']])
          .then(function(allPlayers) {
            allPlayers.data.map(function(player) {
              TeamPlayerInfo.getPlayerHeader(player.player_id)
                .then(function(header) {
                  player['full_name'] = header.data[0].player_name;
                  player['first_name'] = header.data[0].first_name;
                  player['last_name'] = header.data[0].last_name;
                  if (player.team_id === $scope.teamId) {
                    $scope.teamRoster.push(player);
                  } else {
                    $scope.opponentRoster.push(player);
                  }
                });
            });
          });
            
        $scope.opponentName = oppo[0].toUpperCase() + oppo.slice(1);
        $scope.show_game_bool = true;
        $scope.show_roster_bool = true;
      });
  };

  $scope.displayTeam();
});

indexApp.directive('gameSingleInfo', function() {
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
            <td align="left"><strong>Teams</strong></td>
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
          <tr>
            <td align="left">{{teamName}}</td>
            <td align="center">{{team_stats.pts}}</td>
            <td align="right">{{team_stats.fgm}}</td>
            <td align="center">{{team_stats.fga}}</td>
            <td align="left">{{team_stats.fga !== 0 ? (team_stats.fgm / team_stats.fga).toFixed(2) : 0}}</td>
            <td align="right">{{team_stats.fg3m}}</td>
            <td align="center">{{team_stats.fg3a}}</td>
            <td align="left">{{team_stats.fg3a !== 0 ? (team_stats.fg3m / team_stats.fg3a).toFixed(2) : 0}}</td>
            <td align="right">{{team_stats.ftm}}</td>
            <td align="center">{{team_stats.fta}}</td>
            <td align="left">{{team_stats.fta !== 0 ? (team_stats.ftm / team_stats.fta).toFixed(2) : 0}}</td>
            <td align="center">{{team_stats.oreb}}</td>
            <td align="center">{{team_stats.dreb}}</td>
            <td align="center">{{team_stats.oreb + team_stats.dreb}}</td>
            <td align="center">{{team_stats.ast}}</td>
            <td align="center">{{team_stats.stl}}</td>
            <td align="center">{{team_stats.blk}}</td>
            <td align="center">{{team_stats.to}}</td>
            <td align="center">{{team_stats.pf}}</td>
            <td align="center">{{team_stats.plus_minus}}</td>
          </tr>
          <tr>
            <td align="left">{{opponentName}}</td>
            <td align="center">{{opponent_stats.pts}}</td>
            <td align="right">{{opponent_stats.fgm}}</td>
            <td align="center">{{opponent_stats.fga}}</td>
            <td align="left">{{opponent_stats.fga !== 0 ? (opponent_stats.fgm / opponent_stats.fga).toFixed(2) : 0}}</td>
            <td align="right">{{opponent_stats.fg3m}}</td>
            <td align="center">{{opponent_stats.fg3a}}</td>
            <td align="left">{{opponent_stats.fg3a !== 0 ? (opponent_stats.fg3m / opponent_stats.fg3a).toFixed(2) : 0}}</td>
            <td align="right">{{opponent_stats.ftm}}</td>
            <td align="center">{{opponent_stats.fta}}</td>
            <td align="left">{{opponent_stats.fta !== 0 ? (opponent_stats.ftm / opponent_stats.fta).toFixed(2) : 0}}</td>
            <td align="center">{{opponent_stats.oreb}}</td>
            <td align="center">{{opponent_stats.dreb}}</td>
            <td align="center">{{opponent_stats.oreb + opponent_stats.dreb}}</td>
            <td align="center">{{opponent_stats.ast}}</td>
            <td align="center">{{opponent_stats.stl}}</td>
            <td align="center">{{opponent_stats.blk}}</td>
            <td align="center">{{opponent_stats.to}}</td>
            <td align="center">{{opponent_stats.pf}}</td>
            <td align="center">{{opponent_stats.plus_minus}}</td>
          </tr>
        </tbody>
      </table>
    `
  };
});

indexApp.directive('teamRoster', function() {
  return {
    template: `
      <table class="highlight col s12"><thead>
      <tr>
      <th align="left"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      <th align="right"></th>
      </tr>
      </thead><tbody>
      <tr class="categories">
      <td align="left"><strong>{{teamName}}</strong></td>
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
      <tr ng-repeat="player in teamRoster">
      <td align="left"><a href="/src/#/player/{{teamName}}/{{player['first_name']}}_{{player['last_name']}}">{{player['full_name']}}</a></td>
      <td align="center">{{player.pts}}</td>
      <td align="right">{{player.fgm}}</td>
      <td align="center">{{player.fga}}</td>
      <td align="left">{{player.fga !== 0 ? (player.fgm / player.fga).toFixed(2) : 0}}</td>
      <td align="right">{{player.fg3m}}</td>
      <td align="center">{{player.fg3a}}</td>
      <td align="left">{{player.fg3a !== 0 ? (player.fg3m / player.fg3a).toFixed(2) : 0}}</td>
      <td align="right">{{player.ftm}}</td>
      <td align="center">{{player.fta}}</td>
      <td align="left">{{player.fta !== 0 ? (player.ftm / player.fta).toFixed(2) : 0}}</td>
      <td align="center">{{player.oreb}}</td>
      <td align="center">{{player.dreb}}</td>
      <td align="center">{{player.oreb + player.dreb}}</td>
      <td align="center">{{player.ast}}</td>
      <td align="center">{{player.stl}}</td>
      <td align="center">{{player.blk}}</td>
      <td align="center">{{player.to}}</td>
      <td align="center">{{player.pf}}</td>
      <td align="center">{{player.plus_minus}}</td>
      </tr>

      <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

      <tr class="categories">
      <td align="left"><strong>{{opponentName}}</strong></td>
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
      <tr ng-repeat="player in opponentRoster">
      <td align="left"><a href="/src/#/player/{{teamName}}/{{player['first_name']}}_{{player['last_name']}}">{{player['full_name']}}</a></td>
      <td align="center">{{player.pts}}</td>
      <td align="right">{{player.fgm}}</td>
      <td align="center">{{player.fga}}</td>
      <td align="left">{{player.fga !== 0 ? (player.fgm / player.fga).toFixed(2) : 0}}</td>
      <td align="right">{{player.fg3m}}</td>
      <td align="center">{{player.fg3a}}</td>
      <td align="left">{{player.fg3a !== 0 ? (player.fg3m / player.fg3a).toFixed(2) : 0}}</td>
      <td align="right">{{player.ftm}}</td>
      <td align="center">{{player.fta}}</td>
      <td align="left">{{player.fta !== 0 ? (player.ftm / player.fta).toFixed(2) : 0}}</td>
      <td align="center">{{player.oreb}}</td>
      <td align="center">{{player.dreb}}</td>
      <td align="center">{{player.oreb + player.dreb}}</td>
      <td align="center">{{player.ast}}</td>
      <td align="center">{{player.stl}}</td>
      <td align="center">{{player.blk}}</td>
      <td align="center">{{player.to}}</td>
      <td align="center">{{player.pf}}</td>
      <td align="center">{{player.plus_minus}}</td>
      </tr>
      </tbody></table>

    `
  };
});
