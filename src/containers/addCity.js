import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import Header  from './Header';

import {  Grid } from 'react-bootstrap';

 const addCity = (props) => {
    return (
        <Grid>
            <Header />
            <Form />
        </Grid>
    )
}

export default addCity

