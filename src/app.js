const angularComponents = angular.module('angularComponents', [])
const angularServices = angular.module('angularServices', [])

const angularApp = angular.module('angularApp', [
  'ui.router',
  'angularServices',
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
