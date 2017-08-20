import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/task.js';
import  { Task } from './task.js';

import './body.html';

Template.body.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        var filter = {};
        if (instance.state.get('hideCompleted')) {
            filter = {
                checked: {$ne: true}
            };
        }
        //return [{ text: 'Kalle'},]
        return Tasks.find(filter, { sort: { createdAt: -1 }});
    },
});

Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault();

        const text = event.target.text.value;
        event.target.text.value = '';

        Tasks.insert({
            text: text,
            checked: false,
           createdAt: new Date()
        });
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);

    },
});