
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col,Label ,Input,Button} from 'reactstrap';
import { Panel } from 'react-bootstrap';

export default  class NoteItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        delete: PropTypes.func.isRequired,
        edit: PropTypes.func.isRequired
    };

    deleteHandler(){
        this.props.delete(this.props.item.id)
    }

    editHandler(){
        this.props.edit(this.props.item)
    }

    render() {

        const {item} = this.props
        const fire = item.value.fire ? 'danger' : 'info'
        const dateNow = new Date()
        const difDate = (dateNow- item.value.date.stamp)/1000
        let day  = item.value.date.day
            if (day < 10) day = '0' + day
        let month  = item.value.date.month
            if (month < 10) month = '0' + month


        const dateNote = (
            <div>
                <span>Date: </span>
                <span>{day}.</span>
                <span>{month}.</span>
                <span>{item.value.date.year}</span>
            </div>
        )

        const timeAgo = () =>{
            let value ='',
                days = Math.floor(difDate/86400),
                hours = Math.floor((difDate - days*86400)/3600),
                minute = Math.floor((difDate - days*86400 - hours*3600)/60)
            value =  days + ' days,'+ hours + ' hours,' +minute + ' minute'

            if(!days){
                value = hours + ' hours,' +minute + ' minute'
            }


            if(!hours){
                value = minute + ' minute'
            }

            if(!minute){
                value = '< minute'
            }


            return(
                <div>
                    <span>Time ago: </span>
                    <span>{value}</span>
                </div>
            )

        }

        return (
            <div>
                <Panel header= {item.value.title} bsStyle={fire}>
                    <div>{item.value.desc}</div>

                    <div className="notes-item__time">
                        {dateNote}
                        {timeAgo()}
                    </div>

                    <Row>
                        <Col xs="6">
                            <Button color="danger" onClick={this.deleteHandler.bind(this)} className="w-100">Delete</Button>
                        </Col>

                        <Col xs="6">
                            <Button color="primary" onClick={this.editHandler.bind(this)} className="w-100">Edit</Button>
                        </Col>
                    </Row>

                </Panel>
            </div>
        )
    }
}
