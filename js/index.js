'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
   _inherits(App, _React$Component);

   function App(props) {
      _classCallCheck(this, App);

      // Temporarily store recipe in memory before
      // pushing recipe object into the value array
      // Otherwise, pushing recipe object in setTitle
      // creates a recipe on every keystroke

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.prefix = '_hongyi0220_recipes';
      _this.state = { memory: { title: null,
            ingredients: null },
         value: null,
         flip: '',
         recipeIndex: null
      };
      _this.store = _this.store.bind(_this);
      _this.retrieve = _this.retrieve.bind(_this);
      _this.setTitle = _this.setTitle.bind(_this);
      _this.setIngredients = _this.setIngredients.bind(_this);
      _this.flip = _this.flip.bind(_this);
      _this.deleteRecipe = _this.deleteRecipe.bind(_this);
      _this.editRecipe = _this.editRecipe.bind(_this);
      _this.clearMemory = _this.clearMemory.bind(_this);
      _this.pushMemoryToValue = _this.pushMemoryToValue.bind(_this);
      _this.cancel = _this.cancel.bind(_this);
      return _this;
   }

   App.prototype.store = function store() {
      window.localStorage.setItem(this.prefix, JSON.stringify(this.state.value));
      this.clearMemory();
      this.setState({ flip: '' });
   };

   App.prototype.pushMemoryToValue = function pushMemoryToValue() {
      var state = _extends({}, this.state);
      var index = state.recipeIndex;
      if (state.memory.title && state.memory.ingredients && index) {
         state.value.splice(index, 1, this.state.memory);
         this.setState({ recipeIndex: null });
      } else if (state.memory.title && state.memory.ingredients) {
         state.value.push(this.state.memory);
      }
      this.setState({ state: state });
      this.store();
   };

   App.prototype.clearMemory = function clearMemory() {
      var memory = _extends({}, this.state.memory);
      memory.title = '';
      memory.ingredients = '';
      this.setState({ memory: memory });
   };

   App.prototype.retrieve = function retrieve() {
      return window.localStorage.getItem(this.prefix);
   };

   App.prototype.setTitle = function setTitle(e) {
      var memory = _extends({}, this.state.memory);
      memory.title = e.target.value;
      this.setState({ memory: memory });
   };

   App.prototype.setIngredients = function setIngredients(e) {
      var memory = _extends({}, this.state.memory);
      memory.ingredients = e.target.value.split(/,/);
      this.setState({ memory: memory });
   };
   // This enables flip motion defined in CSS by adding .flip

   App.prototype.flip = function flip() {
      var toggleFlip = this.state.flip ? '' : ' flip';
      this.setState({ flip: toggleFlip });
   };

   App.prototype.cancel = function cancel() {
      this.clearMemory();
      this.flip();
      this.setState({ recipeIndex: null });
   };

   App.prototype.deleteRecipe = function deleteRecipe(e) {
      var state = _extends({}, this.state);
      var recipeIndex = e.target.id;
      state.value.splice(recipeIndex, 1);
      this.setState({ state: state });
      this.store();
   };

   App.prototype.editRecipe = function editRecipe(e) {
      var state = _extends({}, this.state);
      var index = e.target.id;
      var title = state.value[index].title;
      var ingredients = state.value[index].ingredients;
      state.memory.title = title;
      state.memory.ingredients = ingredients;
      this.setState({ recipeIndex: index });
      this.flip();
   };

   // This gets recipes array from localStorage and
   // set it as state's value

   App.prototype.componentWillMount = function componentWillMount() {
      if (!this.retrieve()) {
         this.setState({ value: [{ "title": "Braised pork", "ingredients": ["1 lb pork belly", " pinch salt", " 1 tsp black pepper"] }, { "title": "Blueberry muffin", "ingredients": ["4 cups flour", " 1 cup fresh blueberry", " 1/4 cup sugar"] }, { "title": "Apple pie", "ingredients": ["half dozen fresh apples", " 1 cup sugar", " lots of love!\n"] }] });
      } else this.setState({ value: JSON.parse(this.retrieve()) });
   };

   App.prototype.render = function render() {
      var backProps = { pushMemory: this.pushMemoryToValue, setTitle: this.setTitle, setIngredients: this.setIngredients };
      return React.createElement(
         'div',
         { className: 'app-container' + this.state.flip },
         React.createElement(
            'div',
            { className: 'app-flipper' },
            React.createElement(
               'div',
               { className: 'app-front' },
               React.createElement(Head, { flip: this.flip }),
               React.createElement(Cards, { value: this.state.value, deleteRecipe: this.deleteRecipe, editRecipe: this.editRecipe })
            ),
            React.createElement(
               'div',
               { className: 'app-back' },
               React.createElement(Back, { addRecipe: backProps, cancel: this.cancel, memory: this.state.memory, isRecipeIndex: this.state.recipeIndex })
            )
         )
      );
   };

   return App;
}(React.Component);

var Head = function Head(props) {
   return React.createElement(
      'div',
      { id: 'head' },
      React.createElement(
         'span',
         null,
         'Recipes'
      ),
      '  ',
      React.createElement('i', { id: 'addRecipe', onClick: props.flip, className: 'fa fa-plus', 'aria-hidden': 'true' })
   );
};

var Cards = function Cards(props) {
   var colors = ['gold', 'sandybrown', 'coral', 'tomato'];
   if (!props.value) return React.createElement(
      'p',
      null,
      '\'Loading Recipes..\';'
   );
   return React.createElement(
      'div',
      null,
      props.value.map(function (recipe, i) {
         return React.createElement(
            'div',
            { className: 'card-container', id: 'card-container' + i },
            React.createElement(
               'div',
               { className: 'card-flipper' },
               React.createElement(
                  'div',
                  { className: 'card-front', id: 'card-front' + colors[i % colors.length] },
                  React.createElement(
                     'span',
                     null,
                     recipe.title
                  ),
                  '  ',
                  React.createElement('i', { id: i, className: 'fa fa-trash-o', 'aria-hidden': 'true', onClick: props.deleteRecipe }),
                  '  ',
                  React.createElement('i', { id: i, className: 'fa fa-pencil', 'aria-hidden': 'true', onClick: props.editRecipe })
               ),
               React.createElement(
                  'div',
                  { className: 'card-back', id: 'card-back' + colors[i % colors.length] },
                  recipe.ingredients.map(function (ingredient, i) {
                     return React.createElement(
                        'div',
                        { className: 'ingredient' },
                        React.createElement('input', { type: 'checkbox',
                           id: 'checkBox' + i }),
                        React.createElement(
                           'label',
                           { 'for': 'checkBox' + i },
                           ingredient
                        )
                     );
                  })
               )
            )
         );
      })
   );
};

var Back = function Back(props) {
   var isRecipeIndex = props.isRecipeIndex;
   return React.createElement(
      'div',
      { className: 'back' },
      React.createElement('input', { onChange: props.addRecipe.setTitle, type: 'text', placeholder: 'Recipe name', value: props.memory.title }),
      React.createElement('textarea', { onChange: props.addRecipe.setIngredients, placeholder: 'Add ingredients seperated by commas( , )', value: props.memory.ingredients }),
      React.createElement(
         'div',
         { onClick: props.addRecipe.pushMemory, className: 'button' },
         React.createElement(
            'span',
            null,
            isRecipeIndex ? 'Edit Recipe' : 'Add Recipe'
         ),
         '  '
      ),
      React.createElement(
         'div',
         { className: 'x-container' },
         React.createElement('i', { className: 'fa fa-times', 'aria-hidden': 'true', onClick: props.cancel })
      )
   );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));