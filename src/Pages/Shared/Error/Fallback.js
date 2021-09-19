import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const Error = ({error}) => (
    <div className="container">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={() => <Redirect to="/"/>}>Try again</button>
    </div>
);

export default Error;