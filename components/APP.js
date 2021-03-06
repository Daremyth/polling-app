var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var io = require('socket.io-client');
var Header = require('./parts/Header');
var Sidebar = require('./Sidebar');

var APP = React.createClass({

    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            member: {},
            audience: [],
            speaker: '',
            questions: [],
            currentQuestion: false,
            results: {},
            chatHistory: []
        }
    },

    componentWillMount() {
        this.socket = io();
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.updateState);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
        this.socket.on('start', this.start);
        this.socket.on('end', this.updateState);
        this.socket.on('ask', this.ask);
        this.socket.on('results', this.updateResults);
        this.socket.on('chat', this.chat);
    },

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    },

    connect() {

        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

        if (member && member.type === 'audience') {
            this.emit('join', member);
        } else if (member && member.type === 'speaker') {
            this.emit('start', { name: member.name, title: sessionStorage.title });
        }

        this.setState({ status: 'connected' });
    },

    disconnect() {
        this.setState({ 
            status: 'disconnected',
            title: 'disconnected',
            speaker: '' 
        });
    },

    chat(data) {
        this.setState({ chatHistory: data });
    },

    updateState(serverState) {
        this.setState(serverState);
    },

    joined(member) {
        sessionStorage.member = JSON.stringify(member);
        this.setState({ member: member });
    },

    updateAudience(newAudience) {
        this.setState({ audience: newAudience });
    },

    start(presentation) {
        if (this.state.member.type === 'speaker') {
            sessionStorage.title = presentation.title;
        }
        this.setState(presentation);
    },

    ask(question) {
        sessionStorage.answer = '';
        this.setState({ 
            currentQuestion: question,
            results: {a:0,b:0,c:0,d:0} 
        });
    },

    updateResults(data) {
        this.setState({ results: data });
    },

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Header {...this.state} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <RouteHandler emit={this.emit} {...this.state} />
                    </div>
                    <div className="col-md-4">
                        <Sidebar emit={this.emit} {...this.state} />
                    </div>
                </div>      
            </div>
        );
    }

});

module.exports = APP;