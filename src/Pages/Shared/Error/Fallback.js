import React from 'react';

const Error = ({error}) => (
    <div className="container">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={() => null}>Try again</button>
    </div>
);

export default Error;