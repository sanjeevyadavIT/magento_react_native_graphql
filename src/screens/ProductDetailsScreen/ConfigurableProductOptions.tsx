import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { ConfigurableOptionType } from '../../apollo/queries/configurableProductFragment';
import { SPACING } from '../../constants';
import ConfigurableOptionValues from './ConfigurableOptionValues';

export interface Props {
  options: Array<ConfigurableOptionType>;
}

const ConfigurableProductOptions: React.FC<Props> = ({ options }) => {
  const renderOption = (item: ConfigurableOptionType) => (
    <View key={String(item.id)} style={styles.container}>
      <Text h3 h3Style={styles.label}>
        {item.label}
      </Text>
      <ConfigurableOptionValues values={item.values} />
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
