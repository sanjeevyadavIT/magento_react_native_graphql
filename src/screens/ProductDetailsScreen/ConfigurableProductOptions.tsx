import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { ConfigurableOptionType } from '../../apollo/queries/configurableProductFragment';
import { SPACING } from '../../constants';
import ConfigurableOptionValues from './ConfigurableOptionValues';
import {
  SelectedConfigurableProductOptions,
  HandleSelectedConfigurableOptions,
} from '../../logic';

export interface Props {
  options: Array<ConfigurableOptionType>;
  selectedConfigurableProductOptions: SelectedConfigurableProductOptions;
  handleSelectedConfigurableOptions: HandleSelectedConfigurableOptions;
}

const ConfigurableProductOptions: React.FC<Props> = ({
  options,
  selectedConfigurableProductOptions,
  handleSelectedConfigurableOptions,
}) => {
  const renderOption = (item: ConfigurableOptionType) => (
    <View key={String(item.id)} style={styles.container}>
      <Text h3 h3Style={styles.label}>
        {item.label}
      </Text>
      <ConfigurableOptionValues
        values={item.values}
        optionCode={item.attributeCode}
        selectedIndex={selectedConfigurableProductOptions[item.attributeCode]}
        handleSelectedConfigurableOptions={handleSelectedConfigurableOptions}
      />
    </View>
  );

  return (
    <>
      <Divider style={styles.divider} />
      {options?.map(renderOption)}
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.large,
  },
  divider: {
    marginVertical: SPACING.tiny,
  },
  label: {
    marginBottom: SPACING.small,
  },
});

export default ConfigurableProductOptions;
