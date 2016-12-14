import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp, initAuth,logout} from '../../actions'
//import { Alert, FormControl, Button ,Col, Row} from 'react-bootstrap';
import { Row, Col, Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from 'firebase';
import './formAuth.css'
import loadingImg from './spin.svg'

class FormAuth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login:'',
            pass:''
        }
    }





    auth(e){
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    signIn(e){
        this.props.signIn(this.state.login,this.state.pass)
    }

    signUp(e){
        this.props.signUp(this.state.login,this.state.pass)
    }

    logout(){
        this.props.logout()
    }


    render() {
        const {auth } = this.props

        const error = auth.error ?  <Alert color="danger">{auth.error}</Alert> : null

        const loading = auth.loading ? <div className="loading"><img className="loading__img" src={loadingImg} alt="Loading" /></div> : null

        const status = auth.loading ?  loading :  error

        const logout = (
            <Button onClick={this.logout.bind(this)} color="primary" >Logout</Button>
        )

        console.log('logoutttttttttttt')
        console.log(auth.logged)

        const authBtns = (

                <Row>
                    <Col xs="6">
                        <Button onClick={this.signIn.bind(this)}  className="w-100" color="primary">Sign in</Button>
                    </Col>

                    <Col xs="6">
                        <Button onClick={this.signUp.bind(this)}  className="w-100" color="primary">Sign up</Button>
                    </Col>
                </Row>
            )

        const btns = auth.logged ? logout : authBtns


        return (
            <div className="search-box">
                <Form>

                    <FormGroup>
                        <Input type="email"
                               value={this.state.login}
                               name="login"
                               placeholder="Login"
                               type='text'
                               onChange={this.auth.bind(this)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Input type="password"
                               value={this.state.pass}
                               name="pass"
                               placeholder="Password"
                               type='text'
                               onChange={this.auth.bind(this)}
                        />
                    </FormGroup>

                </Form>
                    {authBtns}

                <div className="status">{status}</div>
            </div>
        );
    }
}

export default connect((state) =>{
        const { auth } = state
        console.log('FormAuth')
        console.log(state)
      return { auth }
},{signIn, signUp, initAuth, logout}
)(FormAuth)

