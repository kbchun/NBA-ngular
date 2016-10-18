indexApp.controller('index.controller', function($scope, $location, TeamPlayerInfo) {
  $scope.team_search_input = '';
  $scope.player_search_input = '';
  $scope.show_team_bool = false;

  $scope.search = function(keyVal) {
    if (keyVal === 13 || keyVal === undefined) {
      if ($scope.team_search_input === '' && $scope.player_search_input === '') {
        console.log('No team or player provided.');
        return;

      // team search
      } else if ($scope.team_search_input !== '' && $scope.player_search_input === '') {
        $location.path(`/team/${$scope.team_search_input}`);

      // player search
      } else {
        if ($scope.team_search_input === '') {
          $location.path(`/player/${$scope.player_search_input}`);
        } else {
          var teamId = TeamPlayerInfo.getTeamId($team_search_input);
          if ($scope.player_search_input.indexOf(' ') === -1) {
            $location.path(`/player/${teamId}/${$scope.player_search_input}`);
          } else {
            var gapName = $scope.player_search_input.replace(' ', '+');
            $location.path(`/player/${teamId}/${gapName}`);
          }
        }
      }
      $scope.team_search_input = '';
      $scope.player_search_input = '';
    }
  };
});