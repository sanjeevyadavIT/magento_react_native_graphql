import React, { ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES } from '../../../apollo/queries/getCategories';
import { useCategories } from '../useCategories';

const categoryList = [
  {
    id: '12',
    name: 'Pants',
    productCount: 0,
    childrenCount: 0,
    image: '',
    productPreviewImage: { items: [] },
  },
];
const categoriesQueryMock = {
  request: {
    query: GET_CATEGORIES,
    variables: {
      id: '2',
    },
  },
  result: {
    data: {
      categoryList: [
        {
          id: '2',
          children: categoryList,
        },
      ],
    },
  },
};

const categoriesQueryErrorMock = {
  request: {
    query: GET_CATEGORIES,
    variables: {
      id: '2',
    },
  },
  error: new Error('Something went wrong'),
};

describe('useCategories', () => {
  function getHookWrapper(mocks: any = [], variables: { categoryId: string }) {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useCategories(variables),
      {
        wrapper,
      },
    );
    // Test the initial state of the request
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.categories).toBeUndefined();
    return { result, waitForNextUpdate };
  }

  test('should return an array of category on success', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper(
      [categoriesQueryMock],
      { categoryId: '2' },
    );

    // Exercise
    await waitForNextUpdate();

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.categories).toEqual(categoryList);
  });

  test('should return error when request fails', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper(
      [categoriesQueryErrorMock],
      { categoryId: '2' },
    );

    // Exercise
    await waitForNextUpdate();

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.categories).toBeUndefined();
  });
});
