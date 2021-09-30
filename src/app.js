import angular from "angular";
import "@uirouter/angularjs";
import ngRedux from "ng-redux";

import "./components";
import "./todo-storage";

import store from "./redux/store";

const angularApp = angular.module("angularApp", ["ui.router", "angularServices", "angularComponents", ngRedux]);

angularApp
  .config([
    "$locationProvider",
    "$stateProvider",
    "$urlRouterProvider",
    "$ngReduxProvider",
    function ($locationProvider, $stateProvider, $urlRouterProvider, $ngReduxProvider) {
      const home = {
        name: "home",
        url: "/",
        views: {
          heading: "headingComponent",
          "main-content": "mainComponent",
        },
      };

      $stateProvider.state(home);

      $urlRouterProvider.otherwise("/");

      $locationProvider.html5Mode({ enabled: true, requireBase: false });

      $ngReduxProvider.provideStore(store);
    },
  ])
  .run([
    "$rootScope",
    function (rootScope) {
      rootScope.$broadcast("appConfigured");
    },
  ]);
