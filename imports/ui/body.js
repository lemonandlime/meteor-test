import { Template } from 'meteor/templating';

import { Tasks } from '../api/task.js';

import './body.html';

Template.body.helpers({
    tasks() {
        //return [{ text: 'Kalle'},]
        return Tasks.find({}, { sort: { createdAt: -1 }});
    },
});

Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault();

        const text = event.target.text.value;
        event.target.text.value = '';

        Tasks.insert({
          text: text,
           createdAt: new Date()
        });
    }
})