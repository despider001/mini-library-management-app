import pino from 'pino';
import * as rfs from 'rotating-file-stream';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory, { recursive: true });
}

const stream = rfs.createStream('app.log', {
    size: "10M",  // rotate every 10 MegaBytes written (just an example size)
    interval: '1d',  // rotate daily
    compress: "gzip",  // compress rotated files
    maxFiles: 5,  // keep 5 rotated files
    path: logDirectory,
});

const logger = pino({
  level: 'info',
}, stream);


export default logger;
