"use strict";
// In here, we're can add some events in /events folder, so we don't need to fill it up the server.js with all these events.
const { readdirSync } = require("fs"); // You don't need to install this again.
module.exports = (client) => {
    const events = readdirSync(`${process.cwd()}/prod/events`);
    for (let event of events) {
        let file = require(`${process.cwd()}/prod/events/${event}`);
        client.on(event.split(".")[0], (...args) => file(client, ...args));
        // This will remove the .js and only with the name of the event.
    }
};
