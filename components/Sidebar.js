var React = require('react');
var Display = require('./parts/Display');
var Chat = require('./parts/Chat');

var Sidebar = React.createClass({
    
    render() {
        return (
            <Display if={this.props.status === 'connected' && this.props.member.id}>
                <Chat emit={this.props.emit} chatHistory={this.props.chatHistory} member={this.props.member}/>
            </Display>
        )
    }
});

module.exports = Sidebar;