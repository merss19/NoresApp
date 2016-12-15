import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp,logout} from '../../actions'
import { Row, Col, Alert, Button, Form, FormGroup,
            Label, Input, FormText, Container } from 'reactstrap';
import firebase from 'firebase';
import './formAuth.css'
import loadingImg from './spin.svg'

class FormAuth extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        signIn: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    };

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


        return (
            <Container className="form-auth">
                <Form>

                    <FormGroup>
                        <Input type="email"
                               value={this.state.login}
                               name="login"
                               placeholder="Login"
                               type='text'
                               onChange={this.auth.bind(this)}
                               required
                               state="danger"

                        />
                    </FormGroup>

                    <FormGroup>
                        <Input type="password"
                               value={this.state.pass}
                               name="pass"
                               placeholder="Password"
                               type='text'
                               onChange={this.auth.bind(this)}
                               required
                               state="danger"

                        />
                    </FormGroup>

                </Form>
                    {authBtns}

                <div className="status">{status}</div>
            </Container>
        )
    }
}

export default connect((state) =>{
        const { auth } = state
      return { auth }
},{signIn, signUp, logout}
)(FormAuth)

