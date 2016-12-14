import React, { PropTypes } from 'react'
import {Button} from 'reactstrap';
import { connect } from 'react-redux'
import { setFilter} from '../../actions'
import Link from '../link'

/*const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.filter
    }
}



const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)*/

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setFilter(ownProps.filter))
        }
    }
}

export default connect((state, ownProps) =>{

        const active = ownProps.filter === state.notes.filter
        const filter = ownProps.filter
        return { active, filter}
    },mapDispatchToProps
)(Link)
