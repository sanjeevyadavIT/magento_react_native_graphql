import React, { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { DIMENS, SPACING } from '../../constants';
import { translate } from '../../i18n';
import { formatPrice } from '../../logic';

type Props = {
  grandTotal?: {
    currency: string;
    value: number;
  };
  handlePlaceOrder(): void;
};

export const CartFooter = ({
  grandTotal,
  handlePlaceOrder,
}: Props): React.ReactElement => {
  const { theme } = useContext(ThemeContext);
  const containerStyle = useMemo(
    () => ({
      backgroundColor: theme.colors?.white,
      borderColor: theme.colors?.divider,
    }),
    [theme],
  );
  return (
    <View style={[styles.container, containerStyle]}>
      {grandTotal && (
        <Text h4>{`${translate('common.total')} : ${formatPrice(
          grandTotal,
        )}`}</Text>
      )}
      <Button
        containerStyle={styles.placeOrder}
        title={translate('cartScreen.placeOrderButton')}
        onPress={handlePlaceOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.small,
    borderTopWidth: DIMENS.common.borderWidth,
  },
  placeOrder: {
    flex: 1,
    marginStart: SPACING.large,
  },
});
