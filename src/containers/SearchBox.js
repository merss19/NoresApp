import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCity, loadCity, autocomplete,autocompleteDelete} from '../actions'
import ItemCity from '../components/ItemCity'
import { FormControl,Button,Col, Row} from 'react-bootstrap';

class SearchBox extends Component {
    constructor(props) {
        super(props)
          this.state = {
              text:''
        }
    }


    search(e){
        e.preventDefault()
        this.setState({ text: e.target.value.trim() })
        const text = e.target.value.trim()
         this.autocomplete(text)
    }

     autocomplete(text){
         if (text.length !== 0) {
             this.props.autocomplete(text)
         }
     }


    save(text){
        if (text.length !== 0) {
            this.props.loadCity(text)
        }
    }

    searchSubmit(e){
        e.preventDefault()
        const text = this.state.text
        this.save(text)
        this.props.autocompleteDelete()
        this.setState({ text: '' })

    }

    autocompleteClick(city){
        this.setState({ text: city })
    }



    render() {
        const {autoObj } = this.props
        const autoItem =autoObj.id ?  <ItemCity
                                        item={autoObj}
                                        selectClick={this.autocompleteClick.bind(this)}
                                        autoClick={this.props.autocompleteDelete }
                                      />
                                   : null

        return (
            <div className="search-box">
                <form onSubmit={this.searchSubmit.bind(this)} >

                    <Row className="show-grid search-box__line">

                        <Col xs={8}>
                            <FormControl
                                value={this.state.text}
                                placeholder="Enter city"
                                type='text'
                                onChange={this.search.bind(this)}
                            />
                            { autoItem }
                        </Col>

                        <Col xs={4}>
                            <Button bsStyle="primary" className="search-box__btn" type="submit" >Add city</Button>
                        </Col>

                    </Row>

                </form>
            </div>
        );
    }
}

export default connect((state) =>{
        const { auto } = state
        const autoObj = auto.toJS()
        console.log('autoObj.city')
    console.log(autoObj.city)
      return { autoObj }
},{addCity, loadCity, autocomplete, autocompleteDelete}
)(SearchBox)

