import { Color } from 'colors';
import { TransformableInfo } from 'logform';
import { format } from 'winston';

const PREFIX_CHAR: string = '\u25CF';

interface PrefixOptions {
  prefix?: string;
  color?: Color;
}

/**
 * Adds prefix character to log line with default color. Useful when using more than one logger
 */
export const prefix = format(
  (info?: TransformableInfo, opts: PrefixOptions = {}): TransformableInfo => {
    const prefixChar = opts.prefix || PREFIX_CHAR;
    info.prefix = opts.color ? opts.color(prefixChar) : prefixChar;
    return info;
  },
);
