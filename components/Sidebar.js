var React = require('react');
var Display = require('./parts/Display');
var Chat = require('./parts/Chat');

var Sidebar = React.createClass({
    
    getDefaultProps() {
        return {
            status: 'disconnected',
            member: {}
        }
    },
    
    render() {
        return (
            <Display if={this.props.status === 'connected' && this.props.member.type}>
                <Chat />
            </Display>
        )
    }
});

module.exports = Sidebar;