var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

angularComponents.component('headingComponent', {
  template: '\n    <nav style=\'border: 2px solid blue; padding: 2px;\'>\n      <div class="nav-wrapper">\n        <h4>Todos App</h2>\n        <span>{{todoCount()}} to be completed</span>\n      </div>\n    </nav\n  ',
  controller: ['$scope', 'todoStorage', function ($scope, todoStorage) {
    $scope.todoCount = function () {
      return todoStorage.todos.filter(function (todo) {
        return !todo.completed;
      }).length;
    };
  }]
});

angularComponents.component('mainComponent', {
  template: '\n    <main style=\'margin: 16px auto;\'>\n      <form ng-submit="addTodo()" style=\'margin: 0 auto; max-width: 400px;\'>\n        <input placeholder="Add Todo" ng-model="newTodo" autofocus style=\'width: 100%;\'>\n      </form>\n\n\n      <div style=\'display: flex; justify-content: center;\'>\n        <div>\n          <ul class="todo-list">\n            <h4>(1) react</h4>\n            <list-item\n              ng-repeat="todo in todos"\n              index="$index"\n              todo="todo"\n              on-remove="removeTodo"\n              on-edit="handleEdit"\n              on-check="handleCheck">\n            </list-item>\n          </ul>\n        </div>\n\n        <div>\n          <ul class="todo-list">\n            <h4>(2) react</h4>\n            <list-item\n              ng-repeat="todo in todos"\n              index="$index"\n              todo="todo"\n              on-remove="removeTodo"\n              on-edit="handleEdit"\n              on-check="handleCheck">\n            </list-item>\n          </ul>\n        </div>\n\n        <div>\n          <ul class="todo-list">\n            <h4>(1) angular</h4>\n            <ng-list-item\n              ng-repeat="todo in todos"\n              index="$index"\n              todo="todo"\n              on-remove="removeTodo"\n              on-edit="handleEdit(editedTodo, index)"\n              on-check="handleCheck(todo, index)">\n            </ng-list-item>\n          </ul>\n        </div>\n\n        <div>\n          <ul class="todo-list">\n            <h4>(2) angular</h4>\n            <ng-list-item\n              ng-repeat="todo in todos"\n              index="$index"\n              todo="todo"\n              on-remove="removeTodo"\n              on-edit="handleEdit(editedTodo, index)"\n              on-check="handleCheck(todo, index)">\n            </ng-list-item>\n          </ul>\n        </div>\n      </div>\n\n      <pre>{{ todos | json }}</pre>\n\n    </main>\n  ',
  controller: ['$scope', 'todoStorage', function ($scope, todoStorage) {
    this.$onInit = function () {
      // console.log($scope.todos)
    };

    $scope.todos = todoStorage.todos;
    $scope.newTodo = '';

    $scope.addTodo = function () {
      var todo = {
        title: $scope.newTodo,
        completed: false
      };

      todoStorage.todos = todoStorage.todos.concat([todo]);
      $scope.todos = todoStorage.todos;

      $scope.newTodo = '';
    };

    $scope.removeTodo = function (todo, index) {
      todoStorage.todos = todoStorage.todos.filter(function (t, i) {
        return i !== index;
      });
      $scope.todos = todoStorage.todos;
    };

    $scope.handleEdit = function (editedTodo, index) {
      todoStorage.todos = todoStorage.todos.map(function (t, i) {
        if (i === index) {
          return editedTodo;
        }

        return t;
      });
      $scope.todos = todoStorage.todos;
    };

    $scope.handleCheck = function (todo, index) {
      todoStorage.todos = todoStorage.todos.map(function (t, i) {
        if (i === index) {
          return Object.assign({}, t, { completed: !t.completed });
        }

        return t;
      });
      $scope.todos = todoStorage.todos;
    };
  }]
});

angularComponents.component('ngListItem', {
  bindings: {
    index: '<',
    todo: '<',
    onCheck: '&',
    onEdit: '&',
    onRemove: '<'
  },
  template: '\n    <li>\n      <div className="view">\n        <input type="checkbox" ng-checked="$ctrl.todo.completed" ng-click="$ctrl.handleCheck()"></input>\n        <button ng-click="$ctrl.handleEditing()" ng-disabled="!!$ctrl.editingTodo">Edit</button>\n        <button ng-click="$ctrl.onRemove($ctrl.todo, $ctrl.index)">&times;</button>\n\n        <label ng-if="!$ctrl.editingTodo">{{ $ctrl.todo.title }}</label>\n\n        <form ng-if="$ctrl.editingTodo" style=\'display: inline;\' ng-submit="$ctrl.finishEditing()">\n          <input type="text" ng-model="$ctrl.editingTodo.title" ng-blur="$ctrl.finishEditing()"></input>\n        </form>\n      </div>\n    </li>\n  ',
  controller: [function () {
    var ctrl = this;

    ctrl.editingTodo = null;

    ctrl.handleEditing = function () {
      ctrl.editingTodo = angular.copy(ctrl.todo, {});
    };

    ctrl.handleCheck = function () {
      ctrl.onCheck({ index: ctrl.index, todo: ctrl.todo });
    };

    ctrl.finishEditing = function () {
      ctrl.onEdit({ index: ctrl.index, editedTodo: ctrl.editingTodo });
      ctrl.editingTodo = null;
    };
  }]
});

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

    _this.state = {
      editingTodo: null
    };
    return _this;
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          index = _props.index,
          todo = _props.todo,
          onCheck = _props.onCheck,
          onRemove = _props.onRemove,
          onEdit = _props.onEdit;
      var editingTodo = this.state.editingTodo;


      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();

        onEdit(editingTodo, index);
        _this2.setState({ editingTodo: null });
      };

      var setEdit = function setEdit() {
        _this2.setState({ editingTodo: todo });
      };

      var handleEditing = function handleEditing(e) {
        _this2.setState({ editingTodo: Object.assign({}, editingTodo, { title: e.target.value }) });
      };

      return React.createElement(
        'li',
        null,
        React.createElement(
          'div',
          { className: 'view' },
          React.createElement('input', {
            type: 'checkbox',
            checked: Boolean(todo.completed),
            onChange: function onChange() {
              return onCheck(todo, index);
            }
          }),
          React.createElement(
            'button',
            { disabled: Boolean(editingTodo), onClick: setEdit },
            'Edit'
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return onRemove(todo, index);
              } },
            '\xD7'
          ),
          editingTodo ? React.createElement(
            'form',
            { style: { display: 'inline' }, onSubmit: handleSubmit },
            React.createElement('input', {
              type: 'text',
              value: editingTodo.title,
              onChange: handleEditing,
              onBlur: handleSubmit
            })
          ) : React.createElement(
            'label',
            null,
            todo.title
          )
        )
      );
    }
  }]);

  return ListItem;
}(React.Component);

angularComponents.component('listItem', {
  bindings: {
    index: '<',
    todo: '<',
    onCheck: '<',
    onEdit: '<',
    onRemove: '<'
  },
  controller: ['$element', function ($element) {
    var ctrl = this;

    ctrl.$scope = window.angular.element($element).scope();

    // callbacks need to be wrapped in an $apply()
    // in order for the parent to update visually
    var wrap = function wrap(fn) {
      return function () {
        var fnArgs = arguments;

        ctrl.$scope.$apply(function () {
          return fn.apply(null, fnArgs);
        });
      };
    };

    ctrl.$onChanges = function () {
      ReactDOM.render(React.createElement(ListItem, {
        index: ctrl.index,
        todo: ctrl.todo,
        onCheck: wrap(ctrl.onCheck),
        onEdit: wrap(ctrl.onEdit),
        onRemove: wrap(ctrl.onRemove)
      }), $element[0]);
    };

    ctrl.$onDestroy = function () {
      return ReactDOM.unmountComponentAtNode($element[0]);
    };
  }]
});