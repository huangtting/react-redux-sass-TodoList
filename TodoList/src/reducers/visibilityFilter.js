// state默认为 SHOW_ALL
// state.visibilityFilter 的取值有 SHOW_COMPLETED,SHOW_ACTIVE,SHOW_ALL
// 这个变量用来描述todoList的显示状态
const visibilityFilter = (state='SHOW_ALL',action)=>{
    switch(action.type)
    {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}
export default visibilityFilter