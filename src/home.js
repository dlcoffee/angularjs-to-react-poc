angularComponents.component('headingComponent', {
  template: `
    <nav style='border: 2px solid blue; padding: 2px;'>
      <div class="nav-wrapper">
        <h4>Todos App</h2>
        <span>{{todoCount()}} to be completed</span>
      </div>
    </nav
  `,
  controller: [
    '$scope',
    'todoStorage',
    function ($scope, todoStorage) {
      console.log('testing testing')

      $scope.todoCount = () => {
        return todoStorage.todos.filter((todo) => !todo.completed).length
      }

      // $scope.$on('todoAdded', (event, args) => {
      //   console.log(args)
      //   $scope.todoCount++
      // })
    },
  ],
})

angularComponents.component('mainComponent', {
  template: `
    <main style='margin: 16px auto; max-width: 400px;'>
      <form ng-submit="addTodo()">
        <input placeholder="Add Todo" ng-model="newTodo" autofocus style='width: 100%;'>
      </form>

      <ul class="todo-list">
        <li ng-repeat="todo in todos">
          <div class="view">
            <input type="checkbox" ng-model="todo.completed">
            <button ng-click="removeTodo(todo)">&times;</button>
            <label>{{todo.title}}</label>
          </div>
        </li>
      </ul>
    </main>
  `,
  controller: [
    '$rootScope',
    '$scope',
    'todoStorage',
    function ($rootScope, $scope, todoStorage) {
      this.$onInit = function () {
        console.log($scope.todos)
      }

      $scope.todos = todoStorage.todos
      // $scope.todos = [
      //   {
      //     title: 'learn angular',
      //   },
      //   {
      //     title: 'get coffee',
      //   },
      // ]

      $scope.newTodo = ''

      $scope.addTodo = () => {
        const todo = {
          title: $scope.newTodo,
          completed: false,
        }

        $scope.todos.push(todo)

        // $rootScope.$broadcast('todoAdded', { data: todo })
        $scope.newTodo = ''
      }

      $scope.removeTodo = (todo) => {
        $scope.todos.splice($scope.todos.indexOf(todo), 1)
      }
    },
  ],
})
