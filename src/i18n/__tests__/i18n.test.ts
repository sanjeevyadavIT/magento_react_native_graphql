import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import { initLocale } from '../i18n';
import { translate } from '../translate';

jest.mock('i18n-js');

describe('i18n', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should set locale to system locale if available', () => {
    // Setup
    RNLocalize.findBestAvailableLanguage.mockReturnValueOnce({
      languageTag: 'es',
      isRTL: false,
    });

    // Exercise
    initLocale();

    // Verify
    expect(i18n.locale).toBe('es');
    expect(RNLocalize.findBestAvailableLanguage).toBeCalledTimes(1);
  });

  test('should set locale to english, if system locale is not supported', () => {
    // Setup
    RNLocalize.findBestAvailableLanguage.mockReturnValueOnce(undefined);

    // Exercise
    initLocale();

    // Verify
    expect(i18n.locale).toBe('en');
    expect(RNLocalize.findBestAvailableLanguage).toBeCalledTimes(1);
  });

  test('should translate in specific language', () => {
    // Setup
    const key = 'common.login';
    const option = { locale: 'es' };
    const translatedString = 'Acceso';

    const tSpy = jest.spyOn(i18n, 't');
    tSpy.mockReturnValueOnce(translatedString);

    // Exercise
    const result = translate(key, option);

    // Verify
    expect(tSpy).toHaveBeenCalledWith(key, option);
    expect(result).toBe(translatedString);

    tSpy.mockRestore();
  });
});
