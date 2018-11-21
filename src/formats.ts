import * as colors from 'colors';
import * as util from 'util';

import { Format, TransformableInfo } from 'logform';
import { format } from 'winston';

export interface FormatOptions {
  label?: string;
  color?: colors.Color;
  prefix?: string;
}

export const COLORS = {
  BLUE: colors.blue,
  CYAN: colors.cyan,
  GRAY: colors.gray,
  GREEN: colors.green,
  GREY: colors.grey,
  MAGENTA: colors.magenta,
  RED: colors.red,
  WHITE: colors.white,
  YELLOW: colors.yellow
};

const PREFIX_CHAR: string = '\u25CF';

const colorPallete = [COLORS.YELLOW, COLORS.MAGENTA, COLORS.CYAN, COLORS.RED, COLORS.GREEN, COLORS.BLUE, COLORS.WHITE];

let currentColor = 0;

function formatType(type: any) {
  switch (typeof type) {
    case 'undefined':
      return 'undefined';
    case 'object':
      return util.inspect(type);
  }
  return type;
}

function formatMeta(meta: any) {
  if (Array.isArray(meta)) {
    if (meta.length === 0) return '[]';
    return meta.map((cur, idx) => `\n${idx}: ${formatType(cur)}`);
  }
  return formatType(meta);
}

const mergeArguments = format((info: TransformableInfo) => {
  if (typeof info.meta !== 'undefined') info.message = `${info.message}${formatMeta(info.meta)}`;
  return info;
});


const colorizeLabel = format((info?: any, opts?: any) => {
  if (opts.label) info.label = `${opts.color ? opts.color(opts.label) : opts.label} | `;
  else info.label = '';

  return info;
});

const prefix = format((info?: any, opts?: any) => {
  const prefixChar = opts.prefix || PREFIX_CHAR;
  info.prefix = opts.color ? opts.color(prefixChar): prefixChar;
  return info;
})

/** Winston formats */
function defaultFormat(opts: FormatOptions = {}): Format {
  const color: colors.Color = opts.color || colorPallete[currentColor++ % colorPallete.length];
  return format.combine(
//    format.label({ label: opts.label }),
    format.colorize(),
    format.splat(),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
    prefix({ color: color, prefix: opts.prefix }),
    colorizeLabel({ label: opts.label, color: color}),
    mergeArguments(),
    format.printf(
      info => `${info.timestamp} ${info.prefix} ${info.label}${info.level}: ${info.message}`,
    ),
  );
}
export const winstonFormats = {
  /** defaultFormat
   * Merge all arguments into one single line.
   * Format description: timestamp - level - message
   */
  defaultFormat,
};
