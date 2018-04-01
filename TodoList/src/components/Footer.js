import React from 'react'
import FilterLink from '../containers/FilterLink'
// Footer组件的功能是将filter传递进VisibilityFilter
// 在VisibilityFilter中设置active的选项，并定义好onClick函数，onClick函数会调用dispatch
// 在Filter中根据active，选择span还是a来显示children，并会在被点击时，调用传递进来的onClick函数
// 也就是在构建组件的时候将显示和逻辑会分开了
const Footer=()=>{
    return (
    <p className="footer">
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL'>
            ALL
        </FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'>
            Active
        </FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'>
            Completed
        </FilterLink>
    </p>
)}
export default Footer