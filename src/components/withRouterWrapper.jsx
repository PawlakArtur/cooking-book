import React from 'react';
import { withRouter } from 'react-router-dom';
import MethodsContext from './MethodsContext';

const withRouterWrapper = Component => {
	class WithRouterWrapper extends React.Component {
		render() {
			return (
				<MethodsContext.Consumer>
					{ ({ translate }) =>
						<Component {...this.props} translate={translate}/>
					}
				</MethodsContext.Consumer>
			);
		}
	}

	return withRouter(WithRouterWrapper);
};

export default withRouterWrapper;
