import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout, initAuth} from '../../actions'

import Header from '../../components/header';
import { paths } from '../../routes';
import firebase from 'firebase';


export class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
   /*
    static propTypes = {
        auth: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    };*/
    componentDidMount () {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                console.log('componentDidMountddd')
                console.log(user)
                console.log('initAuth')
                console.log(this.props)
                this.props.initAuth()
            } else {
                console.log('componentDidMount')
                console.log('nouser')
            }
        });
    }

    componentWillReceiveProps(nextProps) {

        console.log('componentWillReceivePropsvvv')

        const { router } = this.context
        const { auth } = this.props
        console.log('logged')
        console.log(auth.logged)
        console.log(!nextProps.auth.logged)

        if (auth.logged && !nextProps.auth.logged) {
            router.replace(paths.Form)
        }  else if (!auth.logged && nextProps.auth.logged) {
            router.replace(paths.Notes)
        }

    }

    render() {
        console.log('appss')
        console.log(this.props.logout)
        console.log(this.props)
        return (
            <div>
                <Header
                    checkAuth={this.props.auth.logged}
                    signOut={this.props.logout}
                />

                <div className="main">{this.props.children}</div>
            </div>
        );
    }
}

export default connect((state) =>{
        const { auth } = state
        console.log('App')
        console.log(state)
        return { auth }
    },{ logout,initAuth}
)(App)

