const chalk = require("chalk");
const server = require("./app");

const PORT = process.env["PORT"] ?? 8080;

server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Hello")
  );
});
