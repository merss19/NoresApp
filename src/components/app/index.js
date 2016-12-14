import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout, initAuth} from '../../actions'

import Header from '../../components/header';
import { paths } from '../../routes';
import firebase from 'firebase';


export class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        initAuth: PropTypes.func.isRequired
    }

   componentDidMount () {
     firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.props.initAuth()
            } else {

            }
        })
    }



    componentWillReceiveProps(nextProps) {
        const { router } = this.context
        const { auth } = this.props

        if (auth.logged && !nextProps.auth.logged) {
            router.replace(paths.Form)
        }  else if (!auth.logged && nextProps.auth.logged) {
            router.replace(paths.Notes)
        }
    }

    render() {
         return (
            <div>
                <Header
                    checkAuth={this.props.auth.logged}
                    signOut={this.props.logout}
                />

                <div className="main">{this.props.children}</div>
            </div>
        )
    }
}

export default connect((state) =>{
        const { auth } = state
        return { auth }
    },{ logout,initAuth}
)(App)

