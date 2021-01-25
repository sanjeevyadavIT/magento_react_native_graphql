export const magentoConfig = {
  // Base url
  url: 'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/',
  // Id of the category that host first level categories
  baseCategoryId: '2',
  // Home Screen carousel images (Temp solution)
  homeCarousel: [
    {
      disabled: false,
      label: '',
      position: 0,
      url:
        'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/media/shallow-focus-photography-of-man-wearing-eyeglasses-837306_sm.jpg?auto=webp&format=pjpg&quality=85',
    },
    {
      disabled: false,
      label: '',
      position: 1,
      url:
        'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/media/venia-hero1.jpg?auto=webp&format=pjpg&quality=85',
    },
    {
      disabled: false,
      label: '',
      position: 2,
      url:
        'https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/media/woman-wearing-orange-dress-3503488_sm.jpg?auto=webp&format=pjpg&quality=85',
    },
  ],
  // featured Catgeory products to be shown on HomeScreen, add as many as you want
  homeFeaturedCategories: [
    {
      id: '12',
      name: 'Skirts',
    },
    { id: '11', name: 'Pants & Shorts' },
  ],
};

interface CurrencySymbols {
  [key: string]: string;
}

/**
 * Magento 2 REST API doesn't return currency symbol,
 * so manually specify all currency symbol(that your store support)
 * along side their currency code.
 */
export const currencySymbols: CurrencySymbols = Object.freeze({
  USD: '$',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  CAD: 'CA$',
  CNY: 'CN¥',
  JPY: '¥',
  SEK: 'SEK',
  CHF: 'CHF',
  INR: '₹',
  KWD: 'د.ك',
  RON: 'RON',
});
