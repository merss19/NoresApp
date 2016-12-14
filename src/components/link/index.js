import React, { PropTypes } from 'react'
import {Button} from 'reactstrap';

function clickH(){

}

const Link = ({ active, children, filter,  onClick }) => {
    if (active) {
        return <Button color="warning" className="filter__btn">{children}</Button>
    }

    return (
        <Button onClick={onClick} type="button" color="primary" className="filter__btn">
            {children}
        </Button>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    filter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link
