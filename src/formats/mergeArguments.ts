import { TransformableInfo } from 'logform';
import * as util from 'util';
import { format } from 'winston';

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

/**
 * Merge all arguments into message information. For using this function you should use format.splat() before
 */
export const mergeArguments = format(
  (info: TransformableInfo): TransformableInfo => {
    if (typeof info.meta !== 'undefined') info.message = `${info.message}${formatMeta(info.meta)}`;
    return info;
  },
);
