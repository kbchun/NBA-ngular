indexApp.controller('players.controller', function($scope, $routeParams, TeamPlayerInfo) {
  $scope.player = $routeParams.name;
  $scope.team = $routeParams.team;
  $scope.show_player_bool = true;

  $scope.searchPlayer = function(keyVal) {
    if (keyVal === 13 || keyVal === undefined) {
      var nameGap = $scope.player.indexOf('+');
      if (nameGap !== -1) {
        var firstName = $scope.player.slice(0, nameGap);
        var lastName = $scope.player.slice(nameGap + 1);
        TeamPlayerInfo.getPlayerHeader(firstName.toLowerCase(), lastName.toLowerCase())
          .then(function(players) {
            if (players.data.length === 0) {
              console.log('Invalid player submitted.');
            } else {
              // display players
            }
          });
      }

      // filter using team name
      TeamPlayerInfo.getPlayerInfo($scope.team.toLowerCase())
        .then(function(teamData) {
          // $scope.team = TeamPlayerInfo.getTeamName();
          console.log(teamData)
        });
      $scope.player_search_input = '';
      $scope.show_player_bool = true;
    }
  };
});