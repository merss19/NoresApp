import React, { Component } from 'react';
import { connect } from 'react-redux';
import CityBox from '../components/CityBox';
import { deleteCity } from '../actions'
import {Col} from 'react-bootstrap';

class MainContainer extends Component {

    render(){
        const { cities, deleteCity} = this.props
        const loading = cities.loading ? <h3>loading</h3> : null
        const list = cities.map((city) =>
            <Col xs={3} key={city.data.id} className="city-box">
                <CityBox cityObj={city}  deleteCity={deleteCity}/>
            </Col>)


        return (
            <div>
                <h1>Cities</h1>
                 <h3>{ loading }</h3>
                <div className="city-box__list">
                    { list }
                </div>

            </div>
        )
    }


}

export default connect((state) =>{
    const { cities } = state
    localStorage.setItem('cities', JSON.stringify(cities.toJS()));
      return { cities}
    },  { deleteCity }
)(MainContainer)



