
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddNotes from '../../components/AddNotes';
import NoteItem from '../../components/NoteItem';
import Filter from '../../components/filter';
import { loadNotes, deleteNote, editNote, createNote} from '../../actions'
import { Container, Row, Col,Label ,Input} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon , Form, FormGroup,FormText } from 'reactstrap'
import { Panel } from 'react-bootstrap';

var _ = require('lodash')

 class Notes extends Component {

     constructor(props) {
         super(props);
         this.state = {
             modal: false,
             title: '',
             desc: '',
             editId:'',
             create:false,
             fire:false
         }

         this.toggle = this.toggle.bind(this)
         this.add = this.add.bind(this)
         this.save = this.save.bind(this)
         this.editHandler = this.editHandler.bind(this)
     }

     toggle(){
         this.setState({
             modal: !this.state.modal,
             editId:''
         });
     }

     change(e){
         console.log(e.target.name)
         this.setState({
             [e.target.name]: e.target.value.trim()
         })
     }

     save(){
         console.log('createsd')
         let note = {
             title:this.state.title,
             desc:this.state.desc,
             fire:this.state.fire
         }
         this.props.createNote(note, this.state.editId)
         this.toggle()
         this.setState({
             title: '',
             desc: '',
             create:false
         });

     }

     fire(){
         this.setState({
             fire:!this.state.fire
         });
     }

     add(){
         this.toggle()
         this.setState({
             create: true,
             title: '',
             desc: ''
         });
     }


     componentWillMount() {
        this.props.loadNotes();
    }

     editHandler(item){
         this.toggle()
         console.log('editH')
         console.log(item)
         this.setState({
             editId: item.id,
             title: item.value.title,
             desc: item.value.desc,
             fire:item.value.fire,
             create:false
         })

     }

    render() {
        const { list } = this.props
        const listNotes = list.map((item) =>{
            return(
                <Col key={item.id} xs="6" sm="4">
                    <NoteItem item={item}
                              delete={deleteNote}
                              edit={this.editHandler}
                    />
                </Col>
            )
        })

        const btnName = this.state.create ? 'create' : 'update'


        return (
                <Container>
                    <Button color="danger" onClick={this.add}>Add Notes</Button>
                    <Filter />

                    <Row>
                        {listNotes}
                    </Row>

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

                            <Label check>
                                <Input onChange={this.fire.bind(this)} type="checkbox" checked={this.state.fire}/>
                                Important
                            </Label>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.save}>{btnName}</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
        );
    }
}


export default connect((state) =>{
        const {  notes } = state
        console.log('Notess')
        console.log(state.notes.toJS())
        const list =  getFilter(state.notes.list, state.notes.filter)
    return { list }
    },{loadNotes, deleteNote, editNote, createNote}
)(Notes)


const getFilter = (notes, filter) => {
    console.log('getFilter')
    switch (filter) {
        case 'SHOW_ALL':
            return notes
        case 'SHOW_IMPORTANT':
            return notes.filter(t => t.value.fire)
        case 'SHOW_NOT_IMPORTANT':
            return notes.filter(t => !t.value.fire)
    }
}
