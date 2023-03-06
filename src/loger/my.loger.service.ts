/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class MyLogger extends ConsoleLogger {


  constructor() {
    super();
    const loglevels = process.env.LOGGER_LEVEL.split(',');
    this.setLogLevels([...loglevels] as LogLevel[]);
  }

  log(message: any, stack?: string, context?: string) {
    super.log(message as string, stack, context);
    if (this.chekLevel('log'))
      this.writeToLog(message);
  }

  debug(message: any, stack?: string, context?: string) {
    super.debug(message, stack, context);
    if (this.chekLevel('debug'))
      this.writeToLog(message);
  }


  verbouse(message: any, stack?: string, context?: string) {
    super.verbose(message, stack, context);
    if (this.chekLevel('verbouse'))
      this.writeToLog(message);
  }


  warn(message: any, stack?: string, context?: string) {
    super.warn(message, stack, context);
    if (this.chekLevel('warn'))
      this.writeToLog(message);
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    if (this.chekLevel('error'))
      this.writeToLog(message);
  }

  private chekLevel(value: string): boolean {
    const loglevels = process.env.LOGGER_LEVEL.split(',');
    return loglevels.indexOf(value) !== -1;
  }

  private writeToLog = async (message) => {
    const distr = path.resolve('app.log');

    fs.writeFile(distr, message + '\n\r', { flag: 'a' }, (err) => {
      if (err) {
        // console.log(`FS operation failed: ${err}`);
        return;
      };

    });


  };

  /* private async writeToFile(message: any) {
    const path = './src/logs/app.log';
    const pathDestenation = `./src/logs/app_${Date.now()}.log`;
    fs.stat(path, async (err, stat) => {
      if (stat.size >= 400) {
        await fs.copyFile(path, pathDestenation, (err) => { });
        await fs.truncate(path, (err) => { return });
      }

    }
    );
  } */
}
