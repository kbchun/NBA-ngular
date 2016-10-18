var indexApp = angular.module('index.app', [
  'server.request',
  'ngRoute'
])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/team/:team', {
      templateUrl: './teams/teams.html',
      controller: 'teams.controller'
    })
    .when('/player/:team/:name', {
      templateUrl: './players/players.html',
      controller: 'players.controller'
    });
});