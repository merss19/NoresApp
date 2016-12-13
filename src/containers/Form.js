import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp, initAuth,logout} from '../actions'
import ItemCity from '../components/ItemCity'
import { FormControl,Button,Col, Row} from 'react-bootstrap';
import firebase from 'firebase';

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login:'',
            pass:'',
            name:''
        }
    }





    auth(e){
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    signIn(e){
        this.props.signIn(this.state.login,this.state.pass,this.state.name)
    }

    signUp(e){
        this.props.signUp(this.state.login,this.state.pass,this.state.name)
    }

    logout(){
        this.props.logout()
    }


    render() {
        const {auth } = this.props

        const error = auth.error ? auth.error.message : null

        const logout = (
            <Button onClick={this.logout.bind(this)} bsStyle="primary" className="search-box__btn" >Logout</Button>
        )

        console.log('logout')
        console.log(auth.logged)

        const authBtns = (

                <Row className="show-grid search-box__line">
                    <Col xs={6}>
                        <Button onClick={this.signIn.bind(this)} bsStyle="primary" className="search-box__btn" >Sign in</Button>
                    </Col>

                    <Col xs={6}>
                        <Button onClick={this.signUp.bind(this)} bsStyle="primary" className="search-box__btn" >Sign up</Button>
                    </Col>
                </Row>
            )

        const btns = auth.logged ? logout : authBtns


        return (
            <div className="search-box">
                <form  >

                    <Row className="show-grid search-box__line">

                        <Col xs={12}>
                            <FormControl
                                value={this.state.login}
                                name="login"
                                placeholder="Login"
                                type='text'
                                onChange={this.auth.bind(this)}
                            />
                        </Col>

                    </Row>

                    <Row className="show-grid search-box__line">
                        <Col xs={12}>
                            <FormControl
                                value={this.state.pass}
                                name="pass"
                                placeholder="Password"
                                type='text'
                                onChange={this.auth.bind(this)}
                            />
                        </Col>
                    </Row>

                    <Row className="show-grid search-box__line">
                        <Col xs={12}>
                            <FormControl
                                value={this.state.name}
                                name="name"
                                placeholder="Name"
                                type='text'
                                onChange={this.auth.bind(this)}
                            />
                        </Col>
                    </Row>


                    {authBtns}
                </form>

                <p>{error}</p>

            </div>
        );
    }
}

export default connect((state) =>{
        const { auth } = state
        console.log('Form')
        console.log(state)
      return { auth }
},{signIn, signUp, initAuth, logout}
)(Form)

