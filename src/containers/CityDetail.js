import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid ,Col, Row, Panel} from 'react-bootstrap';


export default class CityDetail extends Component {

    render() {
        const city = this.props.city
        const data = city.data
        const img = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        const temp = Math.round(data.main.temp -272.15) + ' C'
        const desc = data.weather[0].description
        const main = data.weather[0].main

        return (
            <Grid>
                <Panel>
                    <h2 className="city-detail__title">{ city.city }</h2>

                    <Row className="show-grid">
                        <Col xs={3} >humidity: { data.main.humidity }</Col>
                        <Col xs={3} >pressure: { data.main.pressure }</Col>
                        <Col xs={3} > <img src={img} alt=""/> { temp }</Col>
                        <Col xs={3} > { desc } { main }</Col>
                    </Row>

                </Panel>
            </Grid>
        )
  }
}



