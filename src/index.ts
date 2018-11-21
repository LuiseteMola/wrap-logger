import { LoggerOptions, transports } from 'winston';
import * as winston from 'winston';
import { FormatOptions, winstonFormats } from './winstonFormats';

function getLogLevel(level?: string) {
  if (level) return level;
  if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
  if (process.env.NODE_ENV === 'production') return 'info';
  return 'debug';
}

function loggerOptions(opts: LoggerOptions = {}, formatOptions: FormatOptions = {}) {
  if (!opts.level) opts.level = getLogLevel();
  if (!opts.format) opts.format = winstonFormats.defaultFormat(formatOptions);
  if (!opts.transports) opts.transports = [new transports.Console()];
  return opts;
}

export function createNamespace(
  name: string,
  loggerConfig?: LoggerOptions,
  formatOptions: FormatOptions = {},
): winston.Logger {
  if (!formatOptions.label) formatOptions.label = name;
  const namespaceLogger = winston.loggers.add(name, loggerOptions(loggerConfig, formatOptions));
  namespaceLogger.info(
    `Logger "${name}" enabled. LOG_LEVEL = ${getLogLevel(loggerConfig ? loggerConfig.level : undefined)}`,
  );
  return namespaceLogger;
  //    return winston.loggers.add(name, loggerOptions(opts));
}

// Default logger creation
export const logger: winston.Logger = winston.createLogger(loggerOptions());

export { Logger, LoggerOptions } from 'winston';
export { COLORS } from './colors';