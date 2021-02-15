import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../useForm';

describe('useForm', () => {
  // Global constants
  const email = 'alex@gmail.com';
  const password = '123456789';

  test('should return initial values', () => {
    // Setup
    const inititalProps = {
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: jest.fn(),
    };
    const expectedValues = {
      email: '',
      password: '',
    };

    // Exercise
    const { result } = renderHook(() =>
      useForm<{ email: string; password: string }>(inititalProps),
    );

    // Verify
    expect(result.current.values).toEqual(expectedValues);
    expect(inititalProps.onSubmit).not.toHaveBeenCalled();
  });

  test('should handle change in values', () => {
    // Setup
    const inititalProps = {
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: jest.fn(),
    };
    const expectedValues = {
      email,
      password,
    };

    // Exercise
    const { result } = renderHook(() =>
      useForm<{ email: string; password: string }>(inititalProps),
    );
    act(() => {
      result.current.handleChange('email')(email);
      result.current.handleChange('password')(password);
    });

    // Verify
    expect(result.current.values).toEqual(expectedValues);
  });

  test('should toggle boolean values on change', () => {
    // Setup
    const inititalProps = {
      initialValues: {
        isChecked: false,
      },
    };
    const expectedValues = {
      isChecked: true,
    };

    // Exercise
    const { result } = renderHook(() =>
      useForm<{ isChecked: boolean }>(inititalProps),
    );
    act(() => {
      // Purposefully set it to false, should be discarded, and simply toggle current value
      result.current.handleChange('isChecked')(false);
    });

    // Verify
    expect(result.current.values).toEqual(expectedValues);
  });

  test('should handle submit event', async () => {
    // Setup
    const inititalProps = {
      initialValues: {
        email,
        password,
      },
      onSubmit: jest.fn(),
    };
    const expectedValues = {
      email,
      password,
    };

    // Exercise
    const { result } = renderHook(() =>
      useForm<{ email: string; password: string }>(inititalProps),
    );
    await act(async () => {
      await result.current.handleSubmit();
    });

    // Verify
    expect(inititalProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(inititalProps.onSubmit).toHaveBeenCalledWith(expectedValues);
  });
});
