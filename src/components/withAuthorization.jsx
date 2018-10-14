import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import DataContext from './DataContext';
import { firebase } from '../firebase';

const withAuthorization = authCondition => Component => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			firebase.auth.onAuthStateChanged(authUser => {
				if (!authCondition(authUser)) {
					this.props.history.push('/signIn');
				}
			});
		}

		render() {
			return (
				<AuthUserContext.Consumer>
					{ authUser => authUser
						? <DataContext.Consumer>
							{ ({ productList, categoryList, userSettings }) => <Component {...this.props} productList={productList} categoryList={categoryList} userSettings={userSettings}/> }
						</DataContext.Consumer>
						: null
					}
				</AuthUserContext.Consumer>
			);
		}
	}

	WithAuthorization.propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func
		})
	};

	return withRouter(WithAuthorization);
};

export default withAuthorization;
