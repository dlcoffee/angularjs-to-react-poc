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
      $scope.todoCount = () => {
        return todoStorage.todos.filter((todo) => !todo.completed).length
      }
    },
  ],
})

angularComponents.component('mainComponent', {
  template: `
    <main style='margin: 16px auto;'>
      <form ng-submit="addTodo()" style='margin: 0 auto; max-width: 400px;'>
        <input placeholder="Add Todo" ng-model="newTodo" autofocus style='width: 100%;'>
      </form>


      <div style='display: flex; justify-content: center;'>
        <div>
          <ul class="todo-list">
            <h4>(1) angular</h4>
            <ng-list-item
              ng-repeat="todo in todos"
              index="$index"
              todo="todo"
              on-remove="removeTodo"
              on-edit="handleEdit(editedTodo, index)"
              on-check="handleCheck(todo, index)">
            </ng-list-item>
          </ul>
        </div>

        <div>
          <ul class="todo-list">
            <h4>(2) angular</h4>
            <ng-list-item
              ng-repeat="todo in todos"
              index="$index"
              todo="todo"
              on-remove="removeTodo"
              on-edit="handleEdit(editedTodo, index)"
              on-check="handleCheck(todo, index)">
            </ng-list-item>
          </ul>
        </div>
      </div>

      <pre>{{ todos | json }}</pre>

    </main>
  `,
  controller: [
    '$scope',
    'todoStorage',
    function ($scope, todoStorage) {
      this.$onInit = function () {
        // console.log($scope.todos)
      }

      $scope.todos = todoStorage.todos
      $scope.newTodo = ''

      $scope.addTodo = () => {
        const todo = {
          title: $scope.newTodo,
          completed: false,
        }

        todoStorage.todos = todoStorage.todos.concat([todo])
        $scope.todos = todoStorage.todos

        $scope.newTodo = ''
      }

      $scope.removeTodo = (todo, index) => {
        todoStorage.todos = todoStorage.todos.filter((t, i) => i !== index)
        $scope.todos = todoStorage.todos
      }

      $scope.handleEdit = (editedTodo, index) => {
        todoStorage.todos = todoStorage.todos.map((t, i) => {
          if (i === index) {
            return editedTodo
          }

          return t
        })
        $scope.todos = todoStorage.todos
      }

      $scope.handleCheck = (todo, index) => {
        todoStorage.todos = todoStorage.todos.map((t, i) => {
          if (i === index) {
            return { ...t, completed: !t.completed }
          }

          return t
        })
        $scope.todos = todoStorage.todos
      }
    },
  ],
})

angularComponents.component('ngListItem', {
  bindings: {
    index: '<',
    todo: '<',
    onCheck: '&',
    onEdit: '&',
    onRemove: '<',
  },
  template: `
    <li>
      <div className="view">
        <input type="checkbox" ng-checked="$ctrl.todo.completed" ng-click="$ctrl.handleCheck()"></input>
        <button ng-click="$ctrl.handleEditing()" ng-disabled="!!$ctrl.editingTodo">Edit</button>
        <button ng-click="$ctrl.onRemove($ctrl.todo, $ctrl.index)">&times;</button>

        <label ng-if="!$ctrl.editingTodo">{{ $ctrl.todo.title }}</label>

        <form ng-if="$ctrl.editingTodo" style='display: inline;' ng-submit="$ctrl.finishEditing()">
          <input type="text" ng-model="$ctrl.editingTodo.title" ng-blur="$ctrl.finishEditing()"></input>
        </form>
      </div>
    </li>
  `,
  controller: [
    function () {
      const ctrl = this

      // ctrl.$onInit = () => {
      //   ctrl.checkboxModel = ctrl.todo.completed
      // }

      ctrl.editingTodo = null

      ctrl.handleEditing = () => {
        ctrl.editingTodo = angular.copy(ctrl.todo, {})
      }

      ctrl.handleCheck = () => {
        ctrl.onCheck({ index: ctrl.index, todo: ctrl.todo })
      }

      ctrl.finishEditing = () => {
        ctrl.onEdit({ index: ctrl.index, editedTodo: ctrl.editingTodo })
        ctrl.editingTodo = null
      }
    },
  ],
})
