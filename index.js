global.PORT = 3000;
global.CONFIG_FILE = './examples/sendgrpc.conf.json';

require('ts-node/register');
require('./src/server/main');
