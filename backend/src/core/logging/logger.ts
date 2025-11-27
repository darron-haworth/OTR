/**
 * Logger configuration
 * Provides structured logging with different log levels
 */

import { config } from '../config/config';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

const logLevelMap: Record<string, LogLevel> = {
  error: LogLevel.ERROR,
  warn: LogLevel.WARN,
  info: LogLevel.INFO,
  debug: LogLevel.DEBUG,
};

const currentLogLevel =
  logLevelMap[config.logging.level.toLowerCase()] || LogLevel.INFO;

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: string;
  data?: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private formatLog(level: string, message: string, context?: string, data?: any, error?: Error): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (context) {
      entry.context = context;
    }

    if (data) {
      entry.data = data;
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: config.nodeEnv === 'development' ? error.stack : undefined,
      };
    }

    return entry;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= currentLogLevel;
  }

  private log(level: LogLevel, levelName: string, message: string, context?: string, data?: any, error?: Error): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.formatLog(levelName, message, context, data, error);

    if (config.logging.format === 'json') {
      console.log(JSON.stringify(entry));
    } else {
      const prefix = `[${entry.timestamp}] [${levelName.toUpperCase()}]`;
      const contextStr = context ? `[${context}]` : '';
      const messageStr = `${prefix} ${contextStr} ${message}`;
      
      if (error) {
        console.error(messageStr, error);
      } else if (data) {
        console.log(messageStr, data);
      } else {
        console.log(messageStr);
      }
    }
  }

  error(message: string, context?: string, error?: Error, data?: any): void {
    this.log(LogLevel.ERROR, 'error', message, context, data, error);
  }

  warn(message: string, context?: string, data?: any): void {
    this.log(LogLevel.WARN, 'warn', message, context, data);
  }

  info(message: string, context?: string, data?: any): void {
    this.log(LogLevel.INFO, 'info', message, context, data);
  }

  debug(message: string, context?: string, data?: any): void {
    this.log(LogLevel.DEBUG, 'debug', message, context, data);
  }
}

export const logger = new Logger();

