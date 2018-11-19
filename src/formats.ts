import * as util from 'util';

import { TransformableInfo } from 'logform';
import { format } from 'winston';

const colors = {
  BLUE: '\u001b[34m',
  CYAN: '\u001b[36m',
  DEFAULT: '\u001b[39m',
  GREEN: '\u001b[32m',
  MAGENTA: '\u001b[35m',
  RED: '\u001b[31m',
  WHITE: '\u001b[37m',
  YELLOW: '\u001b[33m',
};

const PREFIX_CHAR: string = '\u25CF';

const colorPallete = [colors.YELLOW, colors.MAGENTA, colors.CYAN, colors.RED, colors.GREEN, colors.BLUE, colors.WHITE];

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

function formatLabel(label: string, color?: string) {
  if (label) return `${label}| `;
  return '';
}

function printPrefix(color: string) {
  return `${color}${PREFIX_CHAR}${colors.DEFAULT}`;
}

/** Winston formats */
function defaultFormat(opts: any = {}) {
  const color: string = colorPallete[currentColor++ % colorPallete.length];
  return format.combine(
    format.label({ label: opts.label }),
    format.colorize(),
    format.splat(),
    format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS' }),
    mergeArguments(),
    format.printf(
      info => `${info.timestamp} ${printPrefix(color)} ${formatLabel(info.label, color)}${info.level}: ${info.message}`,
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
