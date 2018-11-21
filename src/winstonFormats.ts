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


/** Winston formats */
function defaultFormat(opts: FormatOptions = {}): Format {
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

export const winstonFormats = {
  /** defaultFormat
   * Merge all arguments into one single line.
   * Format description: timestamp - level - message
   */
  defaultFormat,
};
