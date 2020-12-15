/**
 * @format
 */

import 'react-native';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import Navigator from '../src/navigation';
import { GET_CATEGORIES } from '../src/apollo/queries/getCategories';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.useFakeTimers();

const mocks = [
  {
    request: {
      query: GET_CATEGORIES,
      variables: {
        id: '2',
      },
    },
    result: {
      data: {
        categoryList: {
          id: '2',
          name: 'default category',
          children_count: 0,
          product_count: 0,
        },
      },
    },
  },
];

it('renders correctly', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Navigator />
    </MockedProvider>,
  );
});
