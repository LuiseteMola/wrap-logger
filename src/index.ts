import { LoggerOptions, transports } from 'winston';
import * as winston from 'winston';

import * as customFormats from './formats';
import { consolePretty, FormatOptions } from './winstonFormats';

function getLogLevel(level?: string) {
  if (level) return level;
  if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
  if (process.env.NODE_ENV === 'production') return 'info';
  return 'debug';
}

function loggerOptions(opts: LoggerOptions = {}, formatOptions: FormatOptions = {}) {
  if (!opts.level) opts.level = getLogLevel();
  if (!opts.format) opts.format = consolePretty(formatOptions);
  if (!opts.transports) opts.transports = [new transports.Console()];
  return opts;
}

/**
 * createNamespace
 * Create new logger with provided label
 * Transport can be overrided in loggerConfig parameter. If not, a Console transport will be created
 * @param name Logger name
 * @param loggerConfig Winston parameters for logging
 * @param formatOptions Custom wrapper options
 * @returns winston.Logger
 */
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
}

/**
 * Default winston logger
 */
export const logger: winston.Logger = winston.createLogger(loggerOptions());

export { Logger, LoggerOptions } from 'winston';
export { COLORS } from './colors';
export const formats = customFormats;
