import React from 'react'
import {connect} from 'react-redux'
import {addTodo} from '../actions'

let AddTodo = ({ dispatch }) => {
    let input
    // console.log(dispatch);
    return (
      <div className="inner">
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            dispatch(addTodo(input.value))
            input.value = ''
          }}
        >
          <input
        //   将DOM input的引用保存在声明的变量input中
            ref={node => {
              input = node
            }}
          />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }

AddTodo=connect()(AddTodo)
export default AddTodo