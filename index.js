const express = require("express");
const exec = require("child_process").exec;

const config = require("./commands.json").commands;

const app = express();
app.use(express.json());

const port = 999;

function generateController(command) {
  return (req, res) => {
    console.log("Req: ", req.body);
    exec(command);

    res.status(200).json("success");
  };
}

console.log({ config });

config.forEach((item) => {
  app.post(item.path, generateController(item.command));
});

const start = () => {
  app.listen(port, () => {
    console.log("App started on port: ", port);
  });
};

start();
