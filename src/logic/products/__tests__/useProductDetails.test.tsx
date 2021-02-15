import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { useProductDetails } from '../useProductDetails';
import {
  GET_PRODUCT_DETAILS,
  ProductTypeEnum,
} from '../../../apollo/queries/getProductDetails';

const sku = 'MH01';
const product = {
  id: 1,
  sku,
  name: 'Green Jacket',
  type: ProductTypeEnum.CONFIGURED,
  description: {
    html: 'Product Description',
  },
  priceRange: {
    maximumPrice: {
      finalPrice: {
        currency: 'USD',
        value: 29.99,
      },
    },
  },
  mediaGallery: [],
  configurableOptions: [
    {
      id: 23,
      label: 'Color',
      position: 0,
      values: [],
    },
  ],
};
const productDetailsQueryMock = {
  request: {
    query: GET_PRODUCT_DETAILS,
    variables: { sku },
  },
  result: {
    data: {
      products: {
        items: [product],
      },
    },
  },
};

const productDetailsErrorMock = {
  request: {
    query: GET_PRODUCT_DETAILS,
    variables: { sku },
  },
  error: new Error('Something went wrong'),
};

describe('useProductDetails', () => {
  function getHookWrapper(mocks: any = [], variables: { sku: string }) {
    const wrapper = ({
      children,
    }: {
      children: React.ReactElement;
    }): React.ReactElement => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}
      >
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useProductDetails(variables),
      {
        wrapper,
      },
    );
    // Test the initial state of the request
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.productDetails).toBeUndefined();

    return { result, waitForNextUpdate };
  }

  test('should return product details on success', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper(
      [productDetailsQueryMock],
      { sku },
    );

    // Exercise
    await waitForNextUpdate();

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.productDetails).toEqual(product);
  });

  test('should return error when request fails', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper(
      [productDetailsErrorMock],
      { sku },
    );

    // Exercise
    await waitForNextUpdate();

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.productDetails).toBeUndefined();
  });
});
