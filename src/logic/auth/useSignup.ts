import { ApolloError, useMutation } from '@apollo/client';
import {
  CREATE_CUSTOMER,
  CreateCustomerVars,
  CreateCustomerDataType,
} from '../../apollo/mutations/createCustomer';
import { useForm, FormResult } from '../app/useForm';

export interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  secureTextEntry: boolean;
}

interface Result<Values> extends FormResult<Values> {
  loading: boolean;
  data: CreateCustomerDataType | null | undefined;
  error: ApolloError | null | undefined;
}

export const useSignup = (): Result<SignupForm> => {
  const [createCustomer, { loading, data, error }] = useMutation<
    CreateCustomerDataType,
    CreateCustomerVars
  >(CREATE_CUSTOMER);
  const { values, handleChange, handleSubmit } = useForm<SignupForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      secureTextEntry: true,
    },
    onSubmit: async _values => {
      try {
        await createCustomer({
          variables: {
            firstName: _values.firstName,
            lastName: _values.lastName,
            email: _values.email,
            password: _values.password,
          },
        });
      } catch {}
    },
  });

  return {
    values,
    data,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};
