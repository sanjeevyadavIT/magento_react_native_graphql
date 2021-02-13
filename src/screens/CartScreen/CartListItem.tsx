import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, ListItem } from 'react-native-elements';
import { translate } from '../../i18n';
import { DIMENS } from '../../constants';
import { CartItemType } from '../../apollo/queries/basicCartFragment';
import { formatPrice } from '../../logic';

type Props = {
  item: CartItemType;
  index: number;
  onPress(arg0: number): void;
  onRemovePress(arg0: number): void;
};

const CartListItem = ({
  item,
  index,
  onPress,
  onRemovePress,
}: Props): React.ReactElement => {
  const renderImage = () => {
    const uri = `${item.product.small_image.url}?width=${DIMENS.cartScreen.imageSize}`;
    return <Image source={{ uri }} style={styles.image} />;
  };

  return (
    <ListItem onPress={() => onPress(index)} bottomDivider>
      {renderImage()}
      <ListItem.Content>
        <ListItem.Title>{item.product.name}</ListItem.Title>
        <ListItem.Subtitle>{`${translate('common.quantity')} : ${
          item.quantity
        }`}</ListItem.Subtitle>
        <ListItem.Subtitle>{`${translate('common.price')} : ${formatPrice(
          item.prices.rowTotal,
        )}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron name="delete" onPress={() => onRemovePress(index)} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  image: {
    height: DIMENS.cartScreen.imageSize,
    width: DIMENS.cartScreen.imageSize,
  },
});

export default CartListItem;
