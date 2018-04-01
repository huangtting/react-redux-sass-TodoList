import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

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

TodoList.PropTypes={
    todos:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick:PropTypes.func.isRequired
}

export default TodoList