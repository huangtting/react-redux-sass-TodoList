// state默认为[]
const todos= (state=[],action)=>{
    switch(action.type)
    {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    // 加入一个以下定义的todo，state是一个todo的数组
                    id:action.id,
                    text:action.text,
                    compeleted:false
                }
            ]
        case 'TOGGLE_TODO':
        // 遍历数组，如果有id相等，那么就返回修改了compeleted的新state数组
            return state.map(todo=>
                (todo.id===action.id)?
                {...todo,completed:!todo.completed}:todo
            )

        default:
            return state
    }
}

export default todos