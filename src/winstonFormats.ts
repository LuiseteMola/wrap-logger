import { Color } from 'colors';
import { Format } from 'logform';
import { format } from 'winston';

import { getColor } from './colors';
import * as customFormats from './formats/index';

export interface FormatOptions {
  label?: string;
  color?: Color;
  prefix?: string;
}

/**
 * Shows pretty print to console:
 *
 * timestamp | Prefix | Logger label | Logger Level | Message
 * @param opts Custom wrapper options
 */
export function consolePretty(opts: FormatOptions = {}): Format {
  opts.color = getColor(opts.color);
  return format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
    customFormats.prefix({ color: opts.color, prefix: opts.prefix }),
    customFormats.colorizeLabel({ label: opts.label, color: opts.color }),
    customFormats.mergeArguments(),
    format.printf(info => `${info.timestamp} ${info.prefix} ${info.label}${info.level}: ${info.message}`),
  );
}

/**
 * Same as consolePretty, but showing file and line from logger call
 *
 * USE THIS WITH CAUTION: TRACING EACH LOG WILL LEAD TO PERFORMANCE DEGRADATION
 * @param opts Format options
 */
export function consoleDebug(opts: FormatOptions = {}): Format {
  opts.color = getColor(opts.color);
  return format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
    customFormats.trace(),
    customFormats.prefix({ color: opts.color, prefix: opts.prefix }),
    customFormats.colorizeLabel({ label: opts.label, color: opts.color }),
    customFormats.mergeArguments(),
    format.printf(info => `${info.stack}${info.timestamp} ${info.prefix} ${info.label}${info.level}: ${info.message}`),
  );
}

/**
 * Predefined formats
 */
export const winstonFormats = {
  consoleDebug: consoleDebug,
  consolePretty: consolePretty,
};

/**
 * Current default format
 */
export let DEFAULT_FORMAT = consolePretty;

/**
 * Set default logging format for NEW loggers
 * @param defaultFormat Winston format
 */
export function setDefaultFormat(defaultFormat: any) {
  DEFAULT_FORMAT = defaultFormat;
}
