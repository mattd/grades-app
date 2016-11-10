import React from 'react';
import { connect } from 'react-redux';

import AuthLink from '../components/auth-link';

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Grades App</h2>
                {this.props.children}
                <AuthLink />
            </div>
        );
    }
};

export default App;