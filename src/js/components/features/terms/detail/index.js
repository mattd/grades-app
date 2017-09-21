import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Feature } from 'components/containers';
import Loading from 'components/loading';
import TermDetailMenu from './menu';

const mapStateToProps = (state) => {
    return {
        terms: state.terms.data,
        ready: state.terms.meta.updated
    };
};

const TermDetailFeature = ({
    terms,
    ready,
    match
}) => {
    const id = match.params.id;

    if (!ready) {
        return <Loading />;
    } else if (!terms[id]) {
        return <h2>404</h2>;
    } else {
        const name = terms[id].name;
        return (
            <Feature
                title={<Link to="/terms">Terms</Link>}
                subtitle={name}
                menu={<TermDetailMenu id={id} name={name} />}
            >
                <p>ID: {id}</p>
            </Feature>
        );
    }
};

export default connect(mapStateToProps)(TermDetailFeature);
