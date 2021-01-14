import { ApolloError, useMutation } from '@apollo/client';
import {
  CREATE_CUSTOMER_TOKEN,
  CreateCustomerTokenVars,
  CreateCustomerTokenDataType,
} from '../../apollo/mutations/createCustomerToken';
import { useForm, FormResult } from '../app/useForm';

interface LoginForm {
  email: string;
  password: string;
  secureTextEntry: boolean;
}

interface Result<Values> extends FormResult<Values> {
  loading: boolean;
  data: CreateCustomerTokenDataType | null | undefined;
  error: ApolloError | null | undefined;
}

export const useLogin = (): Result<LoginForm> => {
  const [createCustomerToken, { loading, data, error }] = useMutation<
    CreateCustomerTokenDataType,
    CreateCustomerTokenVars
  >(CREATE_CUSTOMER_TOKEN);
  const { values, handleChange, handleSubmit } = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
      secureTextEntry: true,
    },
    onSubmit: async _values => {
      try {
        await createCustomerToken({
          variables: {
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
