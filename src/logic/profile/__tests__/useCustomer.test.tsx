import React, { ReactElement } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CUSTOMER } from '../../../apollo/queries/getCustomer';
import { useCustomer } from '../useCustomer';

const customer = {
  firstName: 'Alex',
  lastName: 'Warner',
  email: 'alexwarner@gmail.com',
};
const customerQueryMock = {
  request: {
    query: GET_CUSTOMER,
  },
  result: {
    data: {
      customer,
    },
  },
};

const customerQueryErrorMock = {
  request: {
    query: GET_CUSTOMER,
  },
  error: new Error('Something went wrong'),
};

describe('useCustomer', () => {
  function getHookWrapper(mocks: any = []) {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useCustomer(), {
      wrapper,
    });
    // Test the initial state of the request
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(typeof result.current.getCustomer).toBe('function');

    return { result, waitForNextUpdate };
  }

  test('should return customer on success', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper([customerQueryMock]);

    // Exercise
    await act(async () => {
      await result.current.getCustomer();
      await waitForNextUpdate();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual({ customer });
  });

  test('should return error when request fails', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper([
      customerQueryErrorMock,
    ]);

    // Exercise
    await act(async () => {
      await result.current.getCustomer();
      await waitForNextUpdate();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
