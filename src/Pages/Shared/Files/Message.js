import React from 'react';
const PropTypes = require("prop-types");

const Message = ({msg}) =>{
    return(
        <div>
            <h4>Alert: {msg}</h4>
        </div>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Message;