import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DIMENS, SPACING } from '../../constants';
import { ConfigurableProductOptionValueType } from '../../apollo/queries/configurableProductFragment';

interface Props {
  values: Array<ConfigurableProductOptionValueType>;
}

const ConfigurableOptionValues = ({ values }: Props): React.ReactElement => {
  const renderValue = (value: ConfigurableProductOptionValueType) => {
    switch (value.swatchData.__typename) {
      case 'ColorSwatchData': {
        return (
          <View
            style={{
              width: DIMENS.productDetailScreen.configurableOptionValueBoxSize,
              height: DIMENS.productDetailScreen.configurableOptionValueBoxSize,
              backgroundColor: value.swatchData.value,
            }}
          />
        );
      }
      case 'TextSwatchData': {
        return <Text>{value.swatchData.value}</Text>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View style={styles.container}>
      {values.map(value => (
        <TouchableOpacity key={String(value.valueIndex)}>
          <View style={styles.valueContainer}>{renderValue(value)}</View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.large,
  },
  valueContainer: {
    borderWidth: DIMENS.common.borderWidth,
    marginEnd: SPACING.small,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    height: DIMENS.productDetailScreen.configurableOptionValueBoxSize,
    minWidth: DIMENS.productDetailScreen.configurableOptionValueBoxSize,
  },
});

export default ConfigurableOptionValues;
