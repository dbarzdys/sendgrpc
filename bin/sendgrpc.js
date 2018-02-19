#!/usr/bin/env node

var program = require('commander');

function parsePort(port) {
    return parseInt(port, 10);
}
program
  .version('0.1.5')
  .option('-p, --port [port]', 'Port', parsePort, '8888')
  .option('-c, --config [file]', 'Config file path', './sendgrpc.conf.json')
  .parse(process.argv);

global.PORT = program.port;
global.CONFIG_FILE = program.config;

require('../dist/server/main');