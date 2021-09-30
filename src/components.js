import angular from "angular";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  addTodo,
  editTitle,
  removeTodo,
  toggleTodo,
} from "./redux/slices/todoSlice";

const angularComponents = angular.module("angularComponents", []);

angularComponents.component("headingComponent", {
  template: `
    <nav style='border: 2px solid blue; padding: 2px;'>
      <div class="nav-wrapper">
        <h4>Todos App</h2>
        <span>{{todoCount()}} to be completed</span>
      </div>
    </nav
  `,
  controller: [
    "$scope",
    "todoStorage",
    function ($scope, todoStorage) {
      $scope.todoCount = () => {
        return todoStorage.todos.filter((todo) => !todo.completed).length;
      };
    },
  ],
});

angularComponents.component("mainComponent", {
  template: `
    <main style='margin: 16px auto;'>
      <form ng-submit="addReduxTodo()" style='margin: 0 auto; max-width: 400px;'>
        <input placeholder="Add Redux Todo" ng-model="newReduxTodo" autofocus style='width: 100%;'>
      </form>

      <div style='display: flex; justify-content: center;'>
        <div>
          <ul class="todo-list">
            <h4>(1) react with redux</h4>
            <list-items />
          </ul>
        </div>

        <div>
          <ul class="todo-list">
            <h4>(1) angular redux</h4>
            <ng-list-item
              ng-repeat="todo in reduxTodo.todos track by todo.id"
              index="$index"
              todo="todo"
              on-remove="removeTodo"
              on-edit="handleEdit(editedTodo, index)"
              on-check="reduxTodo.toggleTodo(index)">
            </ng-list-item>
          </ul>
        </div>

      </div>

      <p>Redux State</p>
      <pre>{{ reduxTodo.todos | json }}</pre>

    </main>
  `,
  controllerAs: "reduxTodo",
  controller: [
    "$scope",
    "todoStorage",
    "$ngRedux",
    function ($scope, todoStorage, $ngRedux) {
      this.$onInit = function () {
        // console.log($scope.todos)
        const unsubscribe = $ngRedux.connect((state) => ({ todos: state.todo.todos }), {
          addTodo,
          removeTodo,
          toggleTodo,
        })(this);
        $scope.$on("$destroy", unsubscribe);
      };

      $scope.addReduxTodo = () => {
        $ngRedux.dispatch(addTodo($scope.newReduxTodo));
        $scope.newReduxTodo = "";
      };

      $scope.removeTodo = (todo, index) => {
        todoStorage.todos = todoStorage.todos.filter((t, i) => i !== index);
        $scope.todos = todoStorage.todos;
      };

      $scope.handleEdit = (editedTodo, index) => {
        $ngRedux.dispatch(editTitle(editedTodo));
      };
    },
  ],
});

angularComponents.component("ngListItem", {
  bindings: {
    index: "<",
    todo: "<",
    onCheck: "&",
    onEdit: "&",
    onRemove: "<",
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
      const ctrl = this;

      ctrl.editingTodo = null;

      ctrl.handleEditing = () => {
        ctrl.editingTodo = angular.copy(ctrl.todo, {});
      };

      ctrl.handleCheck = () => {
        ctrl.onCheck({ index: ctrl.index, todo: ctrl.todo });
      };

      ctrl.finishEditing = () => {
        ctrl.onEdit({ index: ctrl.index, editedTodo: ctrl.editingTodo });
        ctrl.editingTodo = null;
      };
    },
  ],
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTodo: null,
    };
  }

  render() {
    const { index, todo, onCheck, onRemove, onEdit } = this.props;
    const { editingTodo } = this.state;

    const handleSubmit = (e) => {
      e.preventDefault();

      onEdit(editingTodo, index);
      this.setState({ editingTodo: null });
    };

    const setEdit = () => {
      this.setState({ editingTodo: todo });
    };

    const handleEditing = (e) => {
      this.setState({ editingTodo: { ...editingTodo, title: e.target.value } });
    };

    return (
      <li>
        <div className="view">
          <input type="checkbox" checked={Boolean(todo.completed)} onChange={() => onCheck(todo, index)}></input>
          <button disabled={Boolean(editingTodo)} onClick={setEdit}>
            Edit
          </button>
          <button onClick={() => onRemove(todo, index)}>&times;</button>

          {editingTodo ? (
            <form style={{ display: "inline" }} onSubmit={handleSubmit}>
              <input type="text" value={editingTodo.title} onChange={handleEditing} onBlur={handleSubmit}></input>
            </form>
          ) : (
            <label>{todo.title}</label>
          )}
        </div>
      </li>
    );
  }
}

const ListItems = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <>
      {todos.map((todo, index) => (
        <ListItem
          key={index}
          index={index}
          todo={todo}
          onCheck={() => {
            dispatch(toggleTodo(index));
          }}
          onRemove={() => {
            dispatch(removeTodo(index));
          }}
          onEdit={(edited) => {
            dispatch(editTitle(edited))
          }}
        />
      ))}
    </>
  );
};

angularComponents.component("listItems", {
  bindings: {},
  controller: [
    "$element",
    function ($element) {
      const ctrl = this;

      ctrl.$scope = window.angular.element($element).scope();

      ctrl.$onChanges = () => {
        ReactDOM.render(
          <Provider store={store}>
            <ListItems />
          </Provider>,
          $element[0]
        );
      };

      ctrl.$onDestroy = () => ReactDOM.unmountComponentAtNode($element[0]);
    },
  ],
});

export default angularComponents
