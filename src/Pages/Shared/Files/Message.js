import React from 'react';
const PropTypes = require("prop-types");

const Message = ({msg}) =>{
    return(
        <div>
            <p>Alert: {msg}</p>
        </div>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Message;