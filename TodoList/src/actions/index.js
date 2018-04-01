let nextTodoId=0;
export const addTodo=text=>{
    // 新增todo，todo的结构是id + text
    return {
        type:'ADD_TODO',
        id:nextTodoId++,
        text
    }
}
// filter可能的取值有 SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL
export const setVisibilityFilter =filter=>{
    return {
        type:'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo=id=>{
    return {
        type:'TOGGLE_TODO',
        id
    }
}
