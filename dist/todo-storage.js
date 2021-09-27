angularServices.service('todoStorage', [function () {
  return {
    todos: [{
      title: 'learn angular'
    }, {
      title: 'get coffee'
    }]
  };
}]);