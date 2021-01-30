import { useMemo, useContext, useReducer } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { SortEnum } from '../../apollo/queries/getCategoryProducts';
import { translate } from '../../i18n';

interface Props {
  onPress(arg0: any): void;
}

interface Result {
  isVisible: boolean;
  selectedIndex: number;
  setVisible(arg1: boolean): void;
  sortOptions: Array<{
    title: string;
    titleStyle?: TextStyle;
    containerStyle?: ViewStyle;
    onPress?(): void;
  }>;
}

interface SortState {
  isVisible: boolean;
  selectedIndex: number;
}

export const useSort = ({ onPress }: Props): Result => {
  const [state, setState] = useReducer<
    React.Reducer<SortState, { isVisible?: boolean; selectedIndex?: number }>
  >((prevState, newState) => ({ ...prevState, ...newState }), {
    isVisible: false,
    selectedIndex: -1,
  });
  const { theme } = useContext(ThemeContext);
  const sortOptions = useMemo(
    () => [
      {
        title: translate('common.aToZ'),
        onPress: () => {
          onPress({ name: SortEnum.ASC });
          setState({ isVisible: false, selectedIndex: 0 });
        },
      },
      {
        title: translate('common.zToA'),
        onPress: () => {
          onPress({ name: SortEnum.DESC });
          setState({ isVisible: false, selectedIndex: 1 });
        },
      },
      {
        title: translate('common.lowToHigh'),
        onPress: () => {
          onPress({ price: SortEnum.ASC });
          setState({ isVisible: false, selectedIndex: 2 });
        },
      },
      {
        title: translate('common.highToLow'),
        onPress: () => {
          onPress({ price: SortEnum.DESC });
          setState({ isVisible: false, selectedIndex: 3 });
        },
      },
      {
        title: translate('common.cancel'),
        containerStyle: { backgroundColor: theme.colors?.error },
        titleStyle: { color: 'white' },
        onPress: () => setState({ isVisible: false }),
      },
    ],
    [theme, onPress],
  );

  const setVisible = (visible: boolean) => setState({ isVisible: visible });

  return {
    isVisible: state.isVisible,
    selectedIndex: state.selectedIndex,
    setVisible,
    sortOptions,
  };
};
