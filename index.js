const express = require("express");
const exec = require("child_process").exec;

const config = require("./commands.json").commands;

const app = express();

const port = 3000;

function generateController(command) {
  return (req, res) => {
    exec(command);

    res.status(200).json("success");
  };
}

config.forEach((item) => {
  app.post(item.path, generateController(item.command));
});

const start = () => {
  app.listen(port, () => {
    console.log("App started on port: ", port);
  });
};

start();
