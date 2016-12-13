
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddNotes from '../../components/AddNotes';
import { loadNotes} from '../../actions'
import { Container, Row, Col,Label ,Input} from 'reactstrap';
import {Button} from 'reactstrap';
import { Panel } from 'react-bootstrap';

var _ = require('lodash')

 class Notes extends Component {

    componentWillMount() {
        this.props.loadNotes();
    }

     delete(){

     }

    render() {
        const { notes } = this.props
        console.log('notes-notes')
        console.log(notes)
        const list = Object.keys(notes.notes).map((key) =>{
            console.log('itemgffffffffffffffdddddd')
                return(
                        <Col key={key} xs="6" sm="4">
                            <Panel header= {notes.notes[key].title}>
                                <div>{notes.notes[key].desc}</div>
                                <Button color="danger" onClick={this.delete.bind(this)}>Delete</Button>
                                <Button color="success" onClick={this.delete.bind(this)}>Edit</Button>
                                <Label check>
                                    <Input type="checkbox" />
                                    important
                                </Label>
                            </Panel>
                        </Col>
                )

        });


        return (
            <div>
                <Container>
                    <Row>
                        <AddNotes />
                        {list}
                    </Row>
                </Container>


            </div>
        );
    }
}


export default connect((state) =>{
        const { auth, notes } = state
        console.log('Notes')
        console.log(state)
        return { notes }
    },{loadNotes}
)(Notes)