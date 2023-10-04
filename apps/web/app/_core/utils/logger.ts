import pino, { Logger } from 'pino';

const logLevelData = {
  '*': 'silent',
  info: 'info',
  debug: 'debug',
};

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
  return logLevels.get(logger) || logLevels.get('*') || 'info' || 'debug';
}

export function getLogger(name: string): Logger {
  return pino({ name, level: getLogLevel(name) });
}
