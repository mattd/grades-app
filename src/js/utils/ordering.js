import * as R from 'ramda';

export const nextOrder = (obj) => {
    return Object.values(obj).length;
};

export const sortObject = (obj) => {
    return (
        R.sortBy(
            R.prop('order')
        )(R.values(obj))
    );
};