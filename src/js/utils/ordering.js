import * as R from 'ramda';

export const nextOrder = (obj) => {
    return (
        (
            R.last(
                R.sort(
                    R.gt,
                    R.pluck('order')(R.values(obj))
                )
            ) + 1
        ) || 0
    );
};

export const sortObject = (obj) => {
    return (
        R.sortBy(
            R.prop('order')
        )(R.values(obj))
    );
};