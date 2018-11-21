import { TransformableInfo } from 'logform';
import { format } from 'winston';

import * as path from 'path';

/**
 * USE ONLY FOR DEBUG PURPOSES! Showing stack trace in each message will degrade performance
 */
export const trace = format((info?: TransformableInfo): TransformableInfo => {
    const stackTrace = new Error().stack.split('\n')[10];
    const fileName = stackTrace.substring(stackTrace.indexOf('(')+1,stackTrace.indexOf(')'));
    info.stack = `(${path.parse(fileName).base}) `;
    return info;
});