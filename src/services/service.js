angular.module('server.request', [])

.factory('TeamPlayerInfo', function($http) {
  var teamName;
  var urlProBball = 'http://api.probasketballapi.com/';
  var urlPlayerPic = 'http://stats.nba.com/media/players/230x185/';
  var playerId;
  var teamId;

  var getTeamId = function(team) {
    if (_.contains(window.teamAbbrvs, team)) {
      teamId = window.teamIds[window.teamAbbrvs.indexOf(team)];
      teamName = window.teamNames[window.teamAbbrvs.indexOf(team)];
    } else if (_.contains(window.teamNames, team)) {
      teamId = window.teamIds[window.teamNames.indexOf(team)];
      teamName = team;
    } else {
      teamId = null;
    }
    return teamId;
  };

  var getTeamName = function() {
    var result = window.teamNames[window.teamIds.indexOf(teamId)];
    return result[0].toUpperCase() + result.slice(1);
  };

  var getTeamHeader = function(team) {
    return $http({
      method: 'POST',
      url: `${urlProBball}boxscore/team/${window.PRO_BASKETBALL_API}&team_id=${getTeamId(team)}&season=2015`
    });
  };

  var getTeamGame = function(gameId) {
    return $http({
      method: 'POST',
      url: `${urlProBball}game/${window.PRO_BASKETBALL_API}&game_id=${gameId}&season=2015`
    });
  };

  // var getRoster = function(team) {
  //   return $http({
  //     method: 'GET',
  //     url: 
  //   });
  // };

  var getPlayerHeader = function(first, last) {
    return $http({
      method: 'POST',
      url: `${urlProBball}player/${window.SPORT_RADAR_API}`
    });
  };

  var displayPlayerPic = function() {

  };

  return {
    getTeamHeader: getTeamHeader,
    getTeamId: getTeamId,
    getTeamName: getTeamName,
    getTeamGame: getTeamGame,
    getPlayerHeader: getPlayerHeader
  };
});