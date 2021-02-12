import i18n, { TranslateOptions } from 'i18n-js';

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: string, options: TranslateOptions = {}): string {
  return i18n.t(key, options);
}
