var React = require('react');
var Display = require('./Display');
var ChatForm = require('./ChatForm');

var Chat = React.createClass({

    componentDidUpdate() {
        var elem = document.getElementById('chat-display');
        elem.scrollTop = elem.scrollHeight;
    },

    getChatHistory(msg, i) {
        return (
            <div key={i} className='col-xs-12'>
                <Display if={msg.message}>
                    <Display if={msg.user.name === this.props.member.name}>
                        <span>You: {msg.message}</span>
                    </Display>

                    <Display if={msg.user.name !== this.props.member.name && msg.user.type !== 'speaker'}>
                        <span>{msg.user.name}: {msg.message}</span>
                    </Display>

                    <Display if={msg.user.name !== this.props.member.name && msg.user.type === 'speaker'}>
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
                <ChatForm emit={this.props.emit} member={this.props.member} />
            </div>
        )
    }
});

module.exports = Chat;