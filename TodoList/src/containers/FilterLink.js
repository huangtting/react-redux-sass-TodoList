import {connect} from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state,ownProps)=>{
//  用active标记现在要显示类型
    return {
        active: ownProps.filter=== state.visibilityFilter
    }
}
// 将onClick传递给Link，Link中调用onClick后，会产生dispatch
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        onClick :()=>{
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}
const FilterLink =connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink