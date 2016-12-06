import React from 'react';

const getDisplayName = (Component) => {
    return Component.displayName || Component.name || 'Component'
};

export const makeController = (willMount, willUnmount) => {
    return (Component) => {
        const noop = () => {};
        class Controller extends React.Component {
            componentWillMount() {
                willMount ? willMount(this.props) : noop();
            }

            componentWillUnmount() {
                willUnmount ? willUnmount(this.props) : noop();
            }

            render() {
                return (
                    <Component {...this.props} />
                );
            }
        }
        Controller.displayName = `Controller(${getDisplayName(Component)})`;
        return Controller;
    };
};