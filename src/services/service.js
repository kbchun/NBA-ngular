angular.module('server.request', [])

.factory('TeamPlayerInfo', function($http) {
  var teamName;
  var urlProBball = 'http://api.probasketballapi.com/';
  var urlSportRadar = 'http://api.sportradar.us/';
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

  var getTeamGameIds = function(team) {
    return $http({
      method: 'POST',
      url: `${urlProBball}boxscore/team/${window.PRO_BASKETBALL_API}&team_id=${getTeamId(team)}&season=2015`
    });
  };

  var getGameBoxscore = function(gameId) {
    return $http({
      method: 'POST',
      url: `${urlProBball}boxscore/team/${window.PRO_BASKETBALL_API}&game_id=${gameId}`
    });
  };

  var getTeamHeader = function(gameId) {
    return $http({
      method: 'POST',
      url: `${urlProBball}game/${window.PRO_BASKETBALL_API}&game_id=${gameId}&season=2015`
    });
  };

  var getPlayersStats = function(gameId) {
    return $http({
      method: 'POST',
      url: `${urlProBball}boxscore/player/${window.PRO_BASKETBALL_API}&game_id=${gameId}`
    });
  };

  var getPlayerProfile = function(first, last, team) {
    // only first is given
    if (last === undefined && team === undefined) {
      return $http({
        method: 'POST',
        url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&first_name=${first}`
      });

    // only last is given
    } else if (first === undefined && team === undefined) {
      return $http({
        method: 'POST',
        url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&last_name=${last}`
      });

    // first and team is given
    } else if (last === undefined) {
      return $http({
        method: 'POST',
        url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&first_name=${first}&team_id=${team}`
      });

    // last and team is given
    } else if (first === undefined) {
      return $http({
        method: 'POST',
        url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&last_name=${last}&team_id=${team}`
      });

    // first and last is given
    } else if (team === undefined) {
      return $http({
        method: 'POST',
        url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&first_name=${first}&last_name=${last}`
      });
    }
  };

  var getPlayerHeader = function(playerId) {
    return $http({
      method: 'POST',
      url: `${urlProBball}player/${window.PRO_BASKETBALL_API}&player_id=${playerId}`
    });
  };

  return {
    getTeamGameIds: getTeamGameIds,
    getTeamId: getTeamId,
    getTeamName: getTeamName,
    getTeamHeader: getTeamHeader,
    getGameBoxscore: getGameBoxscore,
    getPlayersStats: getPlayersStats,
    getPlayerHeader: getPlayerHeader,
    getPlayerProfile: getPlayerProfile
  };
});