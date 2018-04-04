# react-redux-sass-TodoList

# 运行
```
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm install

```
找到node_modules/react-scripts/config/webpack.config.dev.js文件和webpack.config.prod.js文件

将module配置项的最后一项配置改成如下
```
{
    loader: require.resolve('file-loader'),
    // Exclude `js` files to keep "css" loader working as it injects
    // it's runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.js$/, /\.html$/, /\.json$/,/\.scss$/],
    options: {
         name: 'static/media/[name].[hash:8].[ext]',
    },
},
{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
}
```

然后
```
npm start
```
![todoList](https://raw.githubusercontent.com/huangtting/Blog/master/images/todoList.png)
# Action

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
一个典型的action：
```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
一个action可以通过store.dispatch(action)来发起

# Reducer
reducer 就是一个纯函数，根据dispatch的action的type，来返回一个新的state。
比如：
```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```
reducer是一个纯函数，不能直接修改state，而需要返回一个新的state。在reducer中使用了默认赋值，相当于初始化了state

## combineReducer
```
const todoApp = combineReducers({
  visibilityFilter,
  todos
})
```
将visibilityFilter和todos两个reducer combine，然后这两个reducer分别管理state中的一部分。
最后会由combineReducer将两部分的state结合成一个完整的state。
最后的state会是：
```
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```
# Store
Store中有dispatch方法，可以dispatch(action)，然后reducer会被调用更新state。
```
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
```
根据reducer创建store,当store.dispatch被发起时，会调用这个reducer：
```
createStore(reducer)
```

# redux数据流
### 1.调用store.dispatch(action)
### 2.Store会调用你给它的 reducer
### 3.Root Reducer 可能会把多个 reducer 输出的东西组合成一个状态树。
### 4.Store 会把 root reducer 返回的状态树保存起来。
这个新的状态树就是应用的下一个状态。所有 store.subscribe(listener) 注册的监听器会被执行。监听器可以使用 store.getState() 得到当前的状态。现在，UI 会根据新的状态被更新，如果把 React 与 Redux 放到一块儿用，这时候可以去调用  component.setState(newState)

# container(容器组件)
container包裹UI组件

使用connect创建容器组件：
```
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```
VisibleTodoList是一个包裹了TodoList的一个容器组件。
connect需要两个函数mapStateToProps，mapDispatchToProps

## mapStateToProps
mapStateToProps会订阅 Store，每当state更新的时候（不是组件的state），就会自动执行mapStateToProps，将执行的结果props传入传递给被包裹的UI组件
比如：
```
const mapStateToProps =state=>{
    return {
        // 返回符合条件的数组，传递给TodoList
        todos:getVisibleTodos(state.todos,state.visibilityFilter)
    }
}
```
在TodoList中,能够调用todos
```
const TodoList = ({todos,onTodoClick})=>(
    <ul className='todo-list'>
        {
            todos.map(todo=>(
                // 传递进来的todos数组已经符合分类要求
                // todos里面有 id,completed,text
                // 由于onClickTodo函数需要传递参数，所以把他封装成一个函数传递给Todo
                <Todo key={todo.id} {...todo} onClick={()=>onTodoClick(todo.id)}/>
            ))
        }
    </ul>
)
```

mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。

```
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
```

如果没有定义mapStateToProps，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新

## mapDispatchToProps
通过mapDispatchToProps这个方法，把dispaatch当做props传入被包裹的UI组件

```
const mapDispatchTodoList=dispatch=>{
    return {
        // 传递onTodoClick给TodoList
        onTodoClick : id=>{
            dispatch(toggleTodo(id))
        }
    }
}
```
如果mapDispatchToProps是一个函数, 并且传入ownProps, 当组件获取新的props的时候，mapDispatchToProps也会被调用.

不传mapDispatchToProps的时候，React-Redux会自动将dispatch注入组件的props。

mapDispatchToProps的两种写法：
函数
```
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```
对象
```
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```
## <Provider> 
Provider包裹在最外层组件中，具有store属性，所有的子组件都可以访问store
```
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
他实现的原理是react的context属性。
通过将 childContextTypes 和 getChildContext 添加到 Provider ( context 提供者)，React 自动地向下传递信息，并且子树中的任何组件都可以通过定义contextTypes 去访问它。
```
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```
子组件
```
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```

# 参考
https://ninghao.net/blog/4684
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

