import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { SignupForm, useSignup } from '../useSignup';
import { CREATE_CUSTOMER } from '../../../apollo/mutations/createCustomer';

const initialSignupForm: SignupForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  secureTextEntry: true,
};
const firstName = 'Alex';
const lastName = 'Warner';
const email = 'alexwarner@gmail.com';
const password = 'Password123';
const signupMutationMock = {
  request: {
    query: CREATE_CUSTOMER,
    variables: {
      firstName,
      lastName,
      email,
      password,
    },
  },
  result: {
    data: {
      createCustomerV2: {
        customer: {
          email,
        },
      },
    },
  },
};
const signupMutationErrorMock = {
  request: {
    query: CREATE_CUSTOMER,
    variables: {
      firstName,
      lastName,
      email,
      password,
    },
  },
  error: new Error('Something went wrong'),
};
describe('useSignup', () => {
  function getHookWrapper(mocks: any = []) {
    const wrapper = ({
      children,
    }: {
      children: React.ReactElement;
    }): React.ReactElement => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useSignup(), {
      wrapper,
    });
    // Test the initial state of the request
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.values).toEqual(initialSignupForm);
    expect(typeof result.current.handleChange).toBe('function');
    expect(typeof result.current.handleSubmit).toBe('function');

    return { result, waitForNextUpdate };
  }

  test('should handle change in values', () => {
    // Setup
    const expectedValues: SignupForm = {
      firstName,
      lastName,
      email,
      password,
      secureTextEntry: false,
    };
    const { result } = getHookWrapper();

    // Exercise
    act(() => {
      result.current.handleChange('firstName')(firstName);
      result.current.handleChange('lastName')(lastName);
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      result.current.handleChange('secureTextEntry')(true); // the value true will be ignored, it will get toggled of previous value
    });

    // Verify
    expect(result.current.values).toEqual(expectedValues);
  });

  test('should handle success', async () => {
    // Setup
    const expectedResult = {
      createCustomerV2: {
        customer: {
          email,
        },
      },
    };
    const { result, waitForNextUpdate } = getHookWrapper([signupMutationMock]);

    // Enter correct credentials for signup
    await act(async () => {
      result.current.handleChange('firstName')(firstName);
      result.current.handleChange('lastName')(lastName);
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      await waitForNextUpdate();
      await result.current.handleSubmit();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual(expectedResult);
  });

  test('should handle error', async () => {
    // Setup
    const { result, waitForNextUpdate } = getHookWrapper([
      signupMutationErrorMock,
    ]);

    // Enter correct credentials for signup
    await act(async () => {
      result.current.handleChange('firstName')(firstName);
      result.current.handleChange('lastName')(lastName);
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
      await waitForNextUpdate();
      await result.current.handleSubmit();
    });

    // Verify
    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(new Error('Something went wrong'));
  });
});
