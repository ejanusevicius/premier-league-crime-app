import Spinner from "./Spinner";
import { Fragment } from 'react';

type PropTypes = { loading?: boolean, children: JSX.Element | JSX.Element[] };
function LoadingBoundary({ loading = false, children }: PropTypes): any {
    let content: JSX.Element | JSX.Element[];
    if (loading) {
        content = <Spinner />
    } else {
        content = children;
    }
    return (
    <Fragment>
        {content}
    </Fragment>
    );
};

export default LoadingBoundary;