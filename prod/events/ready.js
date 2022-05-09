"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (client) => {
    console.log("The bot is ready!");
    client.editStatus("dnd", { name: "justice", type: 2 });
};
