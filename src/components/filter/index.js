import React, { PropTypes } from 'react'
import {Button, Row, Col} from 'reactstrap';

import FilterLink from '../filterLink'

const Filter = () => (

    <div>
        Filter:
        <FilterLink filter="SHOW_ALL">
            All
        </FilterLink>

        <FilterLink filter="SHOW_IMPORTANT">
            Important
        </FilterLink>

        <FilterLink filter="SHOW_NOT_IMPORTANT">
            Not Important
        </FilterLink>
    </div>


)

export default Filter
