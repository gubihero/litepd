(function(){
  var app = angular.module('pokedexlite', ['ngRoute']);

  app.config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : 'templates/pokemonList.html',
        controller  : 'pokemonListController'
      })

      .when('/pokemon/:pokemonName', {
        templateUrl : 'templates/pokemon.html',
        controller  : 'pokemonController'
      })
  });



  app.controller('pokemonListController', function($scope, $http){
    $http.get('http://pokeapi.co/api/v1/pokedex/1/').success(function(data) {
      $scope.pokemonlist = data.pokemon;
    });
  });

  app.controller('pokemonController', function($scope, $http, $routeParams){
    var pokemonName = $routeParams.pokemonName;
    $http.get('http://pokeapi.co/api/v1/pokemon/'+pokemonName).success(function(data) {
      $scope.pokemon = data;
      console.log($scope.pokemon);
      $http.get('http://pokeapi.co'+$scope.pokemon['sprites'][0]['resource_uri']).success(function(data) {
        $scope.image = 'http://pokeapi.co'+data.image;
      });
      $http.get('http://pokeapi.co'+$scope.pokemon['descriptions'][0]['resource_uri']).success(function(data) {
        $scope.bio = data;
      });
    });
  });
})();

