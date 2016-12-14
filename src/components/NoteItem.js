
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col,Label ,Input} from 'reactstrap';
import {Button} from 'reactstrap';
import { Panel } from 'react-bootstrap';

export default  class NoteItem extends Component {

     deleteHandler(){

        this.props.delete(this.props.item.id)

     }

    editHandler(){
        this.props.edit(this.props.item)
    }

    render() {

        const {item} = this.props
        const fire = item.value.fire ? 'danger' : 'info'
        return (
            <div>
                <Panel header= {item.value.title} bsStyle={fire}>
                    <div>{item.value.desc}</div>
                    <Button color="danger" onClick={this.deleteHandler.bind(this)}>Delete</Button>
                    <Button color="success" onClick={this.editHandler.bind(this)}>Edit</Button>
                </Panel>
            </div>
        );
    }
}
