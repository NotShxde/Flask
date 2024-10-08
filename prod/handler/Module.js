"use strict";
const fs = require("fs"), homePath = process.cwd();
module.exports = (client) => {
    fs.readdir(`${homePath}/prod/commands/`, (err, categories) => {
        if (err)
            console.log(err);
        console.log(`[FOUND] ${categories.length} category`);
        categories.forEach((category) => {
            let moduleConf = require(`${homePath}/prod/commands/${category}/module.json`);
            if (moduleConf) {
                moduleConf.path = `${homePath}/prod/commands/${category}`;
                moduleConf.cmds = [];
                client.helps.set(category, moduleConf);
                fs.readdir(`${homePath}/prod/commands/${category}`, (err, files) => {
                    console.log(`[COMMAND] ${files.length - 1} cmds - ${category} category`);
                    if (err)
                        console.log(err);
                    files.forEach((file) => {
                        if (file.endsWith(".js")) {
                            let prop = require(`${homePath}/prod/commands/${category}/${file}`);
                            client.commands.set(prop.help.name.toUpperCase(), prop);
                            prop.conf.aliases.forEach((alias) => client.aliases.set(alias.toUpperCase(), prop.help.name.toUpperCase()));
                            client.helps.get(category).cmds.push(prop.help.name.toUpperCase());
                        }
                        ;
                    });
                });
            }
            ;
        });
    });
};
