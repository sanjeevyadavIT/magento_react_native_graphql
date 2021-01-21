import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, SearchBar } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { GenericTemplate } from '../../components';
import { useSearch } from '../../logic';
import { AppStackParamList, Routes } from '../../navigation';

type Props = {
  navigation: StackNavigationProp<
    AppStackParamList,
    Routes.NAVIGATION_TO_SEARCH_SCREEN
  >;
};

const SearchScreen = ({ navigation }: Props): React.ReactElement => {
  const { searchText, handleChange, loading, data } = useSearch();

  return (
    <GenericTemplate scrollable>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleChange}
        value={searchText}
        showLoading={loading}
      />
      <Text>{JSON.stringify(data?.products?.items, null, 2)}</Text>
    </GenericTemplate>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
