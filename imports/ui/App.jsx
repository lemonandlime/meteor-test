import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Tasks } from '../api/task.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {

    handleSubmit(event) {
        event.preventDefault();
        var textField = ReactDOM.findDOMNode(this.refs.textInput);
        const text = textField.value.trim();
        textField.value = "";
        Tasks.insert({
            text: text,
            checked: false,
            createdAt: new Date(),
        });
    };

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text"
                               ref="textInput"
                               placeholder="Add new task"/>
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}).fetch(),
    };
}, App);