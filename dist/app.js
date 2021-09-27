var angularComponents = angular.module('angularComponents', []);
var angularServices = angular.module('angularServices', []);

var angularApp = angular.module('angularApp', ['ui.router', 'angularServices', 'angularComponents']);

angularApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
  var home = {
    name: 'home',
    url: '/',
    views: {
      heading: 'headingComponent',
      'main-content': 'mainComponent'
    }
  };

  $stateProvider.state(home);

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode({ enabled: true, requireBase: false });
}]).run(['$rootScope', function (rootScope) {
  rootScope.$broadcast('appConfigured');
}]);