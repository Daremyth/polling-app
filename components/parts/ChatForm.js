var React = require('react');

var ChatForm = React.createClass ({

    chat() {
        var message = React.findDOMNode(this.refs.message).value;
        var user = this.props.member;
        this.props.emit('chat', { message: message, user: user }); 
        React.findDOMNode(this.refs.message).value = '';
        React.findDOMNode(this.refs.message).focus();
    },

    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.chat}>
                <input ref="message"
                       className="form-control"
                       placeholder="Type your message.."
                       required />
                <button className="btn btn-primary">Send</button>
            </form>
        )
    }
})

module.exports = ChatForm;