indexApp.controller('players.controller', function($scope, $routeParams, TeamPlayerInfo) {
  $scope.playerName;
  $scope.team = $routeParams.team;
  $scope.player_data = [];
  $scope.show_player_bool = true;

  // $scope.searchPlayer = function(keyVal) {
  //   if (keyVal === 13 || keyVal === undefined) {
  //     var nameGap = $scope.player.indexOf('+');
  //     if (nameGap !== -1) {
  //       var firstName = $scope.player.slice(0, nameGap);
  //       var lastName = $scope.player.slice(nameGap + 1);
  //       TeamPlayerInfo.getPlayerHeader(firstName.toLowerCase(), lastName.toLowerCase())
  //         .then(function(players) {
  //           if (players.data.length === 0) {
  //             console.log('Invalid player submitted.');
  //           } else {
  //             // display players
  //           }
  //         });
  //     }

  //     // filter using team name
  //     TeamPlayerInfo.getPlayerInfo($scope.team.toLowerCase())
  //       .then(function(teamData) {
  //         // $scope.team = TeamPlayerInfo.getTeamName();
  //         console.log(teamData)
  //       });
  //     $scope.player_search_input = '';
  //     $scope.show_player_bool = true;
  //   }
  // };

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
  };

  $scope.filterName();
});