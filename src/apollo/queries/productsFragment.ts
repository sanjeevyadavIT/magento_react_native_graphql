import { gql } from '@apollo/client';
import { PRODUCT_PRICE_FRAGMENT } from './productPriceFragment';
import type { PriceRangeType } from './productPriceFragment';

export interface ProductInListType {
  id: number;
  sku: string;
  name: string;
  smallImage: {
    url: string;
  };
  priceRange: PriceRangeType;
}

export const PRODUCTS_FRAGMENT = gql`
  fragment ProductListFragment on Products {
    items {
      id
      sku
      name
      smallImage: small_image {
        url
      }
      ...ProductPrice
    }
  }
  ${PRODUCT_PRICE_FRAGMENT}
`;
