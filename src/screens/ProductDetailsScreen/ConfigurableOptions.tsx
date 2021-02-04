import React, { useContext, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BottomSheet,
  ListItem,
  Text,
  Button,
  ThemeContext,
} from 'react-native-elements';
import { ValueType } from '../../apollo/queries/configurableProductFragment';
import { SPACING } from '../../constants';
import { translate } from '../../i18n';

interface Props {
  id: number;
  label: string;
  selectedValue?: number;
  options: Array<ValueType>;
  onPress(arg0: number, arg1: number): void;
}

const ConfigurableOption = ({
  id,
  selectedValue,
  label,
  options,
  onPress,
}: Props): React.ReactElement => {
  const [isVisible, setVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const labelMap = useMemo(() => {
    const map: { [key: number]: string } = {};
    options.forEach(option => {
      map[option.valueIndex] = option.label;
    });
    return map;
  }, [options]);

  return (
    <View style={styles.container}>
      <Text h3 h3Style={styles.label}>
        {label}
      </Text>
      <Button
        type="outline"
        title={
          labelMap[selectedValue ?? -1] ??
          translate('productDetailsScreen.select', { label })
        }
        onPress={() => setVisible(true)}
      />
      <BottomSheet isVisible={isVisible} containerStyle={styles.sortContainer}>
        {options.map(option => (
          <ListItem
            key={option.valueIndex}
            containerStyle={[
              selectedValue === option.valueIndex && {
                backgroundColor: theme.colors?.grey5,
              },
            ]}
            onPress={() => {
              onPress(id, option.valueIndex);
              setVisible(false);
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{option.label}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.large,
    marginBottom: SPACING.large,
  },
  sortContainer: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
  label: {
    marginBottom: SPACING.small,
  },
});

export default ConfigurableOption;
