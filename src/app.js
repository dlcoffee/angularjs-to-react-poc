const angularControllers = angular.module('angularControllers', [])
const angularComponents = angular.module('angularComponents', [])

const angularApp = angular.module('angularApp', [
  'ui.router',
  'angularControllers',
  'angularComponents',
])

angularApp
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      const home = {
        name: 'home',
        url: '/home',
        views: {
          heading: 'headingComponent',
          'main-content': 'mainComponent',
        },
      }

      $stateProvider.state(home)

      $urlRouterProvider.otherwise('/home')
    },
  ])
  .run([
    '$rootScope',
    function (rootScope) {
      rootScope.$broadcast('appConfigured')
    },
  ])
