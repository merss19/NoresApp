import React, { Component } from 'react';
//import { Button,Col, Row, Panel } from 'react-bootstrap';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon , Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { createNote} from '../actions'
 class  AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title:'',
            desc:''
        }

        this.toggle = this.toggle.bind(this);
        this.create = this.create.bind(this);
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    change(e){
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    create(){
        console.log('createsd')
        let note = {
            title:this.state.title,
            desc:this.state.desc
        }
        this.props.createNote(note)
        this.toggle()

    }


        render(){
            console.log('AddNotes')
            console.log(this.state.modal)
       /* const { cityObj } = this.props
        const data = cityObj.data
        const img =`http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        const temp =Math.round(data.main.temp -272.15) + ' C'*/

        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Add Notes</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon>Notes</InputGroupAddon>
                            <Input placeholder="Title"
                                   name="title"
                                   value={this.state.title}
                                   type='text'
                                   onChange={this.change.bind(this)}

                            />
                        </InputGroup>
                        <FormGroup>
                            <Label for="exampleText">Description</Label>
                            <Input type="textarea"
                                   name="desc"
                                   id="exampleText"
                                   value={this.state.desc}
                                   onChange={this.change.bind(this)}

                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.create}>Create</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>




            )
    }
}
export default connect((state) =>{
        const { auth } = state
        console.log('Form')
        console.log(state)
        return { auth }
    },{createNote}
)( AddNotes)

