import React from 'react'
import PropTypes from 'prop-types'

// Link -> FilterLink -> Footer 
// Link的props包括active children onClick，需要父组件传递进来
// active 和 onClick都在FilterLink中传递进来，children在是Footer中传递进来的
const Link=({active,children,onClick})=>{
    if(active)
    {
        return <span>{children}</span>
    }

    return (
        <a href=''
        onClick={e=>{
            e.preventDefault();
            onClick()
        }}>
        {children}
        </a>
    )
}
Link.PropTypes={
    active:PropTypes.bool.isRequired,
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func.isRequired
}
export default Link