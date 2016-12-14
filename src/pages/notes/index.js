import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NoteItem from '../../components/noteItem';
import Filter from '../../components/filter';
import { loadNotes, deleteNote, createNote,unloadNotes} from '../../actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon ,
            Form, FormGroup, FormText,  Container, Row, Col,Label ,Input } from 'reactstrap'
import './notes.css'

class Notes extends Component {

    static propTypes = {
        list: PropTypes.object.isRequired,
        loadNotes: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired,
        createNote: PropTypes.func.isRequired
    };

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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.save();
        }
    }

    save(){
        if(this.state.title.length && this.state.desc.length){
            let date = Date.now(),
            dateObj = new Date(date),
            year = dateObj.getFullYear(),
            month = dateObj.getMonth(),
            day  = dateObj.getDate(),
            note = {
                title:this.state.title.trim(),
                desc:this.state.desc.trim(),
                fire:this.state.fire,
                date: {
                     stamp:date,
                     year:year,
                     month:month,
                     day:day
                }
            }

             this.props.createNote(note, this.state.editId)
             this.toggle()

             this.setState({
                 title: '',
                 desc: '',
                 create:false,
                 fire:false
             })

        } else {
             this.toggle()
        }


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

    componentWillUnmount() {
        this.props.unloadNotes();
    }

    editHandler(item){
        this.toggle()
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

        const filter = list.toJS().length ? <Filter /> : null
        const btnName = this.state.create ? 'create' : 'update'

        return (
                <Container>
                    <Row>
                        <Col>
                            <div className="addBtn">
                                <Button color="primary" onClick={this.add}>Add Notes</Button>
                            </div>

                            <div className="filter">
                                {filter}
                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <div className="notes__list">
                            {listNotes}
                        </div>

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
                                       onKeyUp={this.onKeyUp.bind(this)}

                                />
                            </InputGroup>
                            <FormGroup>
                                <Label for="exampleText" className="desc">Description</Label>
                                <Input type="textarea"
                                       name="desc"
                                       value={this.state.desc}
                                       onChange={this.change.bind(this)}
                                       onKeyUp={this.onKeyUp.bind(this)}

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
        )
    }
}


export default connect((state) =>{
        const {  notes } = state
        console.log('Notess')
        console.log(state.notes.toJS())
        const list =  getFilter(state.notes.list, state.notes.filter)
    return { list }
    },{loadNotes, deleteNote, createNote,unloadNotes}
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
