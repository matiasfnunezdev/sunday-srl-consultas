import type { Logger } from 'pino';
// eslint-disable-next-line import/no-named-as-default -- description
import pino from 'pino';

const logLevelData = {
  '*': 'silent',
  info: 'info',
  debug: 'debug',
};

const logLevels = new Map<string, string>(Object.entries(logLevelData));

export function getLogLevel(logger: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-binary-expression -- description
  return logLevels.get(logger) || logLevels.get('*') || 'info' || 'debug';
}

export function getLogger(name: string): Logger {
  return pino({ name, level: getLogLevel(name) });
}
