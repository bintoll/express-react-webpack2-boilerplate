import React, { Component } from 'react';
import './App.css';
require('isomorphic-fetch');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json({}))
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
                <a href="javascript:;" onClick={() => this.setState({users: []})}>Null State</a>
            </div>
        );
    }
}

export default App;