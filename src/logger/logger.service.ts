import configuration from '../config/configuration';
import { Logger, transports, format, createLogger } from 'winston';

export type LoggerService = Logger;
export default Logger;

export const factory = (): Logger => {
  const logFormat = format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
  );
  const config = configuration();
  const logLevel = config.logLevel;
  const env = config.env;
  const logger = createLogger({
    level: logLevel,
    format: format.combine(
      format?.json(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    defaultMeta: {
      labels: { application: 'core-api-service', environment: config.env },
    },
  });

  const isLocal = env !== 'staging' && env !== 'production';
  // A console transport logging debug and above.
  logger.add(
    new transports.Console({
      ...(isLocal ? { format: format.simple() } : {}),
    }),
  );

  if (config.isTest()) {
    logger.level = 'error';
  }

  return logger;
};
