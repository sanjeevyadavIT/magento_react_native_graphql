import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { MediaGalleryItemType } from '../../apollo/queries/mediaGalleryFragment';
import { SPACING } from '../../constants';

interface Props {
  items: Array<MediaGalleryItemType>;
}

// TODO: Extract hard coded color value
const MediaGallery = ({ items }: Props): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
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
