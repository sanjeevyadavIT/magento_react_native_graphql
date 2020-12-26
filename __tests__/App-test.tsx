/**
 * @format
 */

import 'react-native';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from 'react-native-elements';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
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
        id: 2,
      },
    },
    result: {
      data: {
        categoryList: {
          id: '2',
          children: [],
        },
      },
    },
  },
];

it('renders correctly', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider>
        <OverflowMenuProvider>
          <Navigator />
        </OverflowMenuProvider>
      </ThemeProvider>
    </MockedProvider>,
  );
});
