// Copied from https://github.com/formium/formik/blob/master/packages/formik/src/Formik.tsx
import { useReducer } from 'react';

interface FormConfig<Values> {
  /**
   * Initial values of the form
   */
  initialValues: Values;
  /**
   * Submission handler
   */
  onSubmit?: (values: Values) => void | Promise<any>;
}

export interface FormResult<Values> {
  values: Values;
  handleChange(field1: string): (field2: any) => void;
  handleSubmit(): Promise<any>;
}

/**
 * Values of fields in the form
 */
interface FormValues {
  [field: string]: any;
}

interface FormState<Values> {
  /** Form values */
  values: Values;
}

type FormAction = {
  type: 'SET_FIELD_VALUE';
  payload: { field: string; value?: any };
};

function formReducer<Values>(state: FormState<Values>, action: FormAction) {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      const field = state.values[action.payload.field];
      let newValue = action.payload.value;
      if (typeof field === 'boolean') {
        // If field is boolean, simply toggle previous value and ignore new value
        newValue = !field;
      }
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: newValue,
        },
      };
    default:
      return state;
  }
}

export function useForm<Values extends FormValues = FormValues>(
  props: FormConfig<Values>,
): FormResult<Values> {
  const [state, dispatch] = useReducer<
    React.Reducer<FormState<Values>, FormAction>
  >(formReducer, {
    values: props.initialValues,
  });

  const handleChange = (field: string) => (value: any): void => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
  };

  const handleSubmit = async () => {
    await props.onSubmit?.(state.values);
  };

  return {
    values: state.values,
    handleChange,
    handleSubmit,
  };
}
