import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Grades App</h2>
                {this.props.children}
            </div>
        );
    };
};

export default App;