import angular from "angular";

const angularServices = angular.module("angularServices", []);

angularServices.service("todoStorage", [
  function () {
    return {
      todos: [
        {
          title: "learn angular",
        },
        {
          title: "get coffee",
        },
      ],
    };
  },
]);

export default angularServices;
