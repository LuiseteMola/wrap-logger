import { Color } from 'colors';
import { TransformableInfo } from 'logform';
import { format } from 'winston';

interface ColorizeLabelOptions {
  label?: string;
  color?: Color;
}
/**
 * Adds color to label
 */
export const colorizeLabel = format(
  (info?: TransformableInfo, opts?: ColorizeLabelOptions): TransformableInfo => {
    if (opts.label) info.label = `${opts.color ? opts.color(opts.label) : opts.label} | `;
    else info.label = '';

    return info;
  },
);
