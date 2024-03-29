const angularComponents = angular.module('angularComponents', [])
const angularServices = angular.module('angularServices', [])

const angularApp = angular.module('angularApp', [
  'ui.router',
  'angularServices',
  'angularComponents',
])

angularApp
  .config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
      const home = {
        name: 'home',
        url: '/',
        views: {
          heading: 'headingComponent',
          'main-content': 'mainComponent',
        },
      }

      $stateProvider.state(home)

      $urlRouterProvider.otherwise('/')

      $locationProvider.html5Mode({ enabled: true, requireBase: false })
    },
  ])
  .run([
    '$rootScope',
    function (rootScope) {
      rootScope.$broadcast('appConfigured')
    },
  ])
