var React = require('react');
var Display = require('./Display');

var Chat = React.createClass({

    componentDidUpdate() {
        var elem = document.getElementById('chat-display');
        elem.scrollTop = elem.scrollHeight;
    },

    chat() {
        var message = React.findDOMNode(this.refs.message).value;
        var user = this.props.member;
        this.props.emit('chat', { message: message, user: user }); 
    },

    getChatHistory(msg, i) {
        return (
            <div key={i} className='col-xs-12'>
                <Display if={msg.message}>
                    <Display if={msg.user.id === this.props.member.id}>
                        <span>You: {msg.message}</span>
                    </Display>

                    <Display if={msg.user.id !== this.props.member.id && msg.user.type !== 'speaker'}>
                        <span>{msg.user.name}: {msg.message}</span>
                    </Display>

                    <Display if={msg.user.id !== this.props.member.id && msg.user.type === 'speaker'}>
                        <span>{msg.user.name} [speaker]: {msg.message}</span>
                    </Display>
                </Display>
            </div> 
                  
        )
    },

    render() {
        return (
            <div className='row'>
                <div id='chat-display' className='row'>
                    {this.props.chatHistory.map(this.getChatHistory)}
                </div>

                <form action="javascript:void(0)" onSubmit={this.chat}>

                    <input ref="message"
                           className="form-control"
                           placeholder="Type your message.."
                           required />
                    <button className="btn btn-primary">Send</button>
                </form>
            </div>
        )
    }
});

module.exports = Chat;