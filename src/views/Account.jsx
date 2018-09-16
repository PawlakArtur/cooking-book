import React from 'react';
import PasswordChange from './PasswordChange';
import PasswordForget from './PasswordForget';
import { AuthUserContext } from '../components';

const Account = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <h1>Account: {authUser.email}</h1>
                <PasswordForget/>
                <PasswordChange/>
            </div>
        }
    </AuthUserContext.Consumer>

export default Account;
