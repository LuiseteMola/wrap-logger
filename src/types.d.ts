import { Logger, LoggerOptions } from 'winston';

type logger = Logger;
declare function createNamespace (name: string, opts?: LoggerOptions): Logger