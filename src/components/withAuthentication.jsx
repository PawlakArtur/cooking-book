import React from 'react';
import { firebase } from '../firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor() {
            super();
            this.state = {
                authUser: null
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
              authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
            });
          }

        render() {
            return (
                <Component/>
            );
        }
    }

    return WithAuthentication;
};

export default withAuthentication;
