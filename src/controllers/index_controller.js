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
        var name = $scope.player_search_input.replace('_', ' ');
        var gapName = name.indexOf(' ');
        if (gapName !== -1) {
          var firstName = name.slice(0, gapName);
          firstName = firstName[0].toUpperCase() + firstName.slice(1);
          var lastName = name.slice(gapName + 1);
          lastName = lastName[0].toUpperCase() + lastName.slice(1);
        }
        if ($scope.team_search_input === '') {
          if (gapName !== -1) {
            $location.path(`/player/_/${firstName}_${lastName}`);

          } else {
            $location.path(`/player/_/${$scope.player_search_input}`);
          }

        } else {
          if (gapName !== -1) {
            $location.path(`/player/${$scope.team_search_input}/${firstName}_${lastName}`);
            
          } else {
            $location.path(`/player/${$scope.team_search_input}/${$scope.player_search_input}`);
          }
        }
      }
      $scope.team_search_input = '';
      $scope.player_search_input = '';
    }
  };
});