import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ImageResizeMode,
  ViewStyle,
} from 'react-native';
import { Text } from 'react-native-elements';
import { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';
import { SPACING, DIMENS } from '../../constants';

interface Props {
  items: Array<MediaGalleryItemType>;
  resizeMode?: ImageResizeMode;
  containerStyle?: ViewStyle;
  width?: number;
  height?: number;
}

const MediaGallery = ({
  items,
  resizeMode = 'contain',
  containerStyle = {},
  width = DIMENS.common.WINDOW_WIDTH,
  height = DIMENS.common.WINDOW_WIDTH,
}: Props): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imageDimension = useMemo(() => ({ width, height }), [width, height]);

  const onMomentumScrollEnd = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;

    const currentNumber = Math.floor(contentOffset / width) + 1;
    setCurrentPage(currentNumber);
  };

  const renderItem = ({ item }: { item: MediaGalleryItemType }) => {
    return (
      <View>
        <Image
          source={{ uri: item.url }}
          resizeMode={resizeMode}
          style={imageDimension}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        horizontal
        pagingEnabled
        data={items}
        keyExtractor={(item, index) => `mediaGalleryItem#${index}`}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.pagination}>{`${currentPage}/${items.length}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  pagination: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: SPACING.large,
    paddingHorizontal: SPACING.small,
    paddingVertical: SPACING.tiny,
    backgroundColor: 'rgba(0,0,0,.6)',
    color: 'white',
    borderRadius: SPACING.large,
  },
});

export default MediaGallery;
