import winston from 'winston';
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf } = format
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}]  ${level}: ${message}`;
  });
  /***
   * winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
   */
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({format : 'HH:mm DD-MM-YYYY'}),
        myFormat
    ),
    transports: [
        new winston.transports.File({ filename: './logs/fundonotes.log' })
    ],
});

export default logger