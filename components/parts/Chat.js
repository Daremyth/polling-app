var React = require('react');

var Chat = React.createClass({
    render() {
        return (
            <form action="javascript:void(0)">
            
                            <div className="row" id="chat-display">
                                <span></span>
                            </div>
                            
                            <input ref="chatMmessage"
                                   className="form-control"
                                   placeholder="Type your message.." />

                            <button className="btn btn-primary">SEND</button>
            </form>
        )
    }
});

module.exports = Chat;