import config from 'config';

export function get<T>(configUtil: string): T {
  return config.get<T>(configUtil);
}
