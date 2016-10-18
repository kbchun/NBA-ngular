indexApp.controller('teams.controller', function($scope, $routeParams, TeamPlayerInfo) {
  $scope.team = $routeParams.team;
  $scope.show_team_bool = false;
  
  $scope.gameIds = [];
  $scope.all_games_data = [];
  $scope.single_game_data = [];
  $scope.show_game_bool = false;

  $scope.show_roster_bool = false;

  $scope.val1 = false;

  $scope.displayTeam = function() {
    TeamPlayerInfo.getTeamHeader($scope.team.toLowerCase())
      .then(function(teamData) {
        if (teamData.data.length === 0) {
          console.log('Invalid team submitted.');
          return;
        }
        $scope.all_games_data = teamData.data;
        $scope.team = TeamPlayerInfo.getTeamName();
        $scope.gameIds = $scope.all_games_data.map(function(game) { return game.game_id; });
        $scope.gameIds.map(function(id) {
          TeamPlayerInfo.getTeamGame(id)
            .then(function(game) {
              if (game.data[0].date) {
                $scope.single_game_data.push(game);
              }
            });
        });
      })
      .then(function() {
        console.log($scope.all_games_data);
        console.log($scope.single_game_data.length);
        $scope.show_team_bool = true;
      });
  };

  $scope.displayOpponent = function(game) {
    var awayTeam = window.teamNames[window.teamIds.indexOf(game.data[0].away_id)];
    var homeTeam = window.teamNames[window.teamIds.indexOf(game.data[0].home_id)];
    if (awayTeam === $scope.team.toLowerCase()) {
      return homeTeam[0].toUpperCase() + homeTeam.slice(1);
    } else {
      return awayTeam[0].toUpperCase() + awayTeam.slice(1);
    }
  };

  $scope.gameDetails = function(game, i) {
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
    $('div').removeClass('bold');
    $(`div #${i['$index']}`).addClass('bold');
    $scope.show_game_bool = true;
    $scope.show_roster_bool = true;
  };

  $scope.displayRoster = function(team) {

  };

  $scope.displayRoster($scope.team.toLowerCase());
  $scope.displayTeam();
});

indexApp.directive('gameSingleInfo', function() {
  return {
    template: `<div class="fixed">game stats</div>`
  };
});

indexApp.directive('teamRoster', function() {
  return {
    template: `<div class="fixed">roster</div>`
  };
});