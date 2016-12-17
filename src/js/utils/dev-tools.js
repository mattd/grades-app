import React from 'react';
import ReactDOM from 'react-dom';
import Mousetrap from 'mousetrap';

import DevTools from '../components/dev-tools';

const launch = (store) => {
    const popup = window.open(
        null,
        'Redux DevTools',
        'menubar=no,location=no,resizable=yes,scrollbars=no,status=no'
    );

    popup.document.write('<div id="react-devtools-root"></div>');
    popup.document.body.setAttribute('style', 'margin:0')

    ReactDOM.render(
        <DevTools store={store} />,
        popup.document.getElementById('react-devtools-root')
    );
};

const bind = (store) => {
    Mousetrap.bind("ctrl+'", () => {
        launch(store);
    });
};

export default { bind };