import {connect} from 'react-redux'
import {toggleTodo} from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos =(todos,filter)=>{
    switch(filter){
        case 'SHOW_COMPLETED':
        // 返回state.todos completed数组
            return todos.filter(t=>t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t=>!t.completed)
        default:
            return todos
    }
}
// 
const mapStateToProps =state=>{
    return {
        // 返回符合条件的数组，传递给TodoList
        todos:getVisibleTodos(state.todos,state.visibilityFilter)
    }
}

const mapDispatchTodoList=dispatch=>{
    return {
        // 传递onTODOClick给TodoList
        onTodoClick : id=>{
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList =connect(
    mapStateToProps,
    mapDispatchTodoList
)(TodoList)

export default VisibleTodoList