import { ApolloError, useMutation } from '@apollo/client';
import {
  CREATE_CUSTOMER_TOKEN,
  CreateCustomerTokenVars,
  CreateCustomerTokenDataType,
} from '../../apollo/mutations/createCustomerToken';
import { IS_LOGGED_IN } from '../../apollo/queries/isLoggedIn';
import { useForm, FormResult } from '../app/useForm';
import { saveCustomerToken } from '../utils/storage';

export interface LoginForm {
  email: string;
  password: string;
  secureTextEntry: boolean;
}

interface Result<Values> extends FormResult<Values> {
  loading: boolean;
  data?: CreateCustomerTokenDataType | null;
  error?: ApolloError;
}

export const useLogin = (): Result<LoginForm> => {
  const [createCustomerToken, { loading, data, error }] = useMutation<
    CreateCustomerTokenDataType,
    CreateCustomerTokenVars
  >(CREATE_CUSTOMER_TOKEN, {
    async update(cache, { data: _data }) {
      if (_data?.generateCustomerToken?.token) {
        await saveCustomerToken(_data.generateCustomerToken.token);
        cache.writeQuery({
          query: IS_LOGGED_IN,
          data: {
            isLoggedIn: true,
          },
        });
      }
    },
  });
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
