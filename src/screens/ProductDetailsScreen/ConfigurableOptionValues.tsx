import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, ThemeContext } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DIMENS, SPACING } from '../../constants';
import { ConfigurableProductOptionValueType } from '../../apollo/queries/configurableProductFragment';
import { HandleSelectedConfigurableOptions } from '../../logic';

interface Props {
  values: Array<ConfigurableProductOptionValueType>;
  optionCode: string;
  selectedIndex: number;
  handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions;
}

const ConfigurableOptionValues = ({
  values,
  optionCode,
  selectedIndex,
  handleSelectedConfigurableOptions,
}: Props): React.ReactElement => {
  const { theme } = useContext(ThemeContext);

  const renderValue = (value: ConfigurableProductOptionValueType) => {
    const selected = selectedIndex === value.valueIndex;
    switch (value.swatchData.__typename) {
      case 'ColorSwatchData': {
        return (
          <>
            <View
              style={{
                width:
                  DIMENS.productDetailScreen.configurableOptionValueBoxSize,
                height:
                  DIMENS.productDetailScreen.configurableOptionValueBoxSize,
                backgroundColor: value.swatchData.value,
              }}
            />
            {selected ? (
              <View style={styles.selectedColor}>
                <Icon type="ionicon" name="checkmark" size={24} />
              </View>
            ) : null}
          </>
        );
      }
      case 'TextSwatchData': {
        return (
          <View
            style={[
              styles.selectedText,
              {
                backgroundColor: selected
                  ? theme.colors?.black
                  : theme.colors?.white,
              },
            ]}
          >
            <Text
              style={{
                color: selected ? theme.colors?.white : theme.colors?.black,
              }}
            >
              {value.swatchData.value}
            </Text>
          </View>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View style={styles.container}>
      {values.map(value => (
        <TouchableOpacity
          key={String(value.valueIndex)}
          onPress={() =>
            handleSelectedConfigurableOptions(optionCode, value.valueIndex)
          }
        >
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
  selectedColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `rgba(0,0,0,.1)`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfigurableOptionValues;
