import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { LoginForm, useLogin } from '../useLogin';
import { CREATE_CUSTOMER_TOKEN } from '../../../apollo/mutations/createCustomerToken';
import { IS_LOGGED_IN } from '../../../apollo/queries/isLoggedIn';

const initialLoginForm: LoginForm = {
  email: '',
  password: '',
  secureTextEntry: true,
};
const email = 'alexwarner@gmail.com';
const password = 'password123';
const successResponse = {
  generateCustomerToken: {
    token: '#$Gfh12DF%22kauw',
  },
};
const loginMutationMock = {
  request: {
    query: CREATE_CUSTOMER_TOKEN,
    variables: {
      email,
      password,
    },
  },
  result: {
    data: successResponse,
  },
};
const loginMutationErrorMock = {
  request: {
    query: CREATE_CUSTOMER_TOKEN,
    variables: {
      email,
      password,
    },
  },
  error: new Error('Something went wrong'),
};

describe('useLogin', () => {
  function getHookWrapper(mocks: any = []) {
    const cache = new InMemoryCache({
      addTypename: false,
    });
    const wrapper = ({
      children,
    }: {
      children: React.ReactElement;
    }): React.ReactElement => (
      <MockedProvider mocks={mocks} addTypename={false} cache={cache}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useLogin(), {
      wrapper,
    });
    const getLoggedInStatusFromCache = () =>
      cache.readQuery({ query: IS_LOGGED_IN });
    // Test the initial state of the request
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.values).toEqual(initialLoginForm);
    expect(getLoggedInStatusFromCache()).toBeNull();
    expect(typeof result.current.handleChange).toBe('function');
    expect(typeof result.current.handleSubmit).toBe('function');

    return { result, waitForNextUpdate, getLoggedInStatusFromCache };
  }

  test('should handle change in values', () => {
    // Setup
    const expectedValues: LoginForm = {
      email,
      password,
      secureTextEntry: false,
    };
    const { result } = getHookWrapper([loginMutationMock]);

    // Exercise
    act(() => {
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      result.current.handleChange('secureTextEntry')(true); // the value true will be ignored, it will get toggled of previous value
    });

    // Verify
    expect(result.current.values).toEqual(expectedValues);
  });

  test('should handle success', async () => {
    // Setup
    const {
      result,
      getLoggedInStatusFromCache,
      waitForNextUpdate,
    } = getHookWrapper([loginMutationMock]);

    // Enter correct credentials for login
    await act(async () => {
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      await waitForNextUpdate();
      await result.current.handleSubmit();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual(successResponse);
    expect(getLoggedInStatusFromCache()).toEqual({ isLoggedIn: true });
  });

  test('should handle error', async () => {
    // Setup
    const {
      result,
      getLoggedInStatusFromCache,
      waitForNextUpdate,
    } = getHookWrapper([loginMutationErrorMock]);

    // Enter credentials for login
    await act(async () => {
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      await waitForNextUpdate();
      await result.current.handleSubmit();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
    expect(getLoggedInStatusFromCache()).toBeNull();
    expect(result.current.error).toEqual(new Error('Something went wrong'));
  });
});
