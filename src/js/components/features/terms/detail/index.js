import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import { Feature } from 'components/containers';
import Loading from 'components/loading';

const mapStateToProps = (state) => {
    return {
        terms: state.terms
    };
};

const MoreVertButton = () => {
    return (
        <IconButton>
            <MoreVertIcon />
        </IconButton>
    );
};

const TermDetailFeature = ({
    terms,
    match
}) => {
    if (R.isEmpty(terms)) {
        return <Loading />;
    } else {
        return (
            <Feature
                title={<Link to="/terms">Terms</Link>}
                subtitle={`${terms[match.params.id].name}`}
                menu={<MoreVertButton />}
            >
                <p>ID: {match.params.id}</p>
            </Feature>
        );
    }
};

export default connect(mapStateToProps)(TermDetailFeature);