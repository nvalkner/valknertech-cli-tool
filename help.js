import chalk from "chalk";

console.log(chalk.bold("\nAvailable custom commands:\n"));

const commandGroups = {
  awsCommands: [{ command: "login", description: "Log in to AWS" }],
  dockerCommands: [{ command: "docker", description: "Start docker" }],
  databaseCommands: [
    { command: "migrateAM", description: "Migrate the AM database" },
    { command: "migrateQM", description: "Migrate the QM database" },
    { command: "initDB", description: "Initiate new database" },
  ],
  projectCommands: [
    {
      command: "startMG",
      description: "Start MacGyverBackend and MacGyverFrontend",
    },
    { command: "edit", description: "Edit custom commands" },
  ],
};

Object.entries(commandGroups).forEach(([groupName, commands]) => {
  console.log(
    chalk.bold(`\n${groupName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())}:
`)
  );
  commands.forEach((cmd) => {
    console.log(
      `${chalk.bold(chalk.green(cmd.command.padEnd(10)))} - ${chalk.cyan(
        cmd.description
      )}`
    );
  });
});
