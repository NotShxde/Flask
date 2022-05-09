const fs = require("fs"), homePath = process.cwd();

module.exports = (client:any) => {
  fs.readdir(`${homePath}/prod/commands/`, (err: any, categories: any[]) => {
    if (err) console.log(err);
    console.log(`[FOUND] ${categories.length} category`);

    categories.forEach((category: any) => {
      let moduleConf = require(`${homePath}/prod/commands/${category}/module.json`);
      if (moduleConf) {
        
        moduleConf.path = `${homePath}/prod/commands/${category}`;
        moduleConf.cmds = [];
        client.helps.set(category, moduleConf);

        fs.readdir(`${homePath}/prod/commands/${category}`, (err: any, files: any[]) => {

          console.log(`[COMMAND] ${files.length - 1} cmds - ${category} category`);
          if (err) console.log(err);

          files.forEach((file: string) => {
            if (file.endsWith(".js")) {

              let prop = require(`${homePath}/prod/commands/${category}/${file}`);
              client.commands.set(prop.help.name, prop);
              prop.conf.aliases.forEach((alias: any) => client.aliases.set(alias, prop.help.name));
              client.helps.get(category).cmds.push(prop.help.name);

            };
          });
        });
      };
    });
  });
};
