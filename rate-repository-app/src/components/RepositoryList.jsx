import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import theme, { onedark } from './theme';
import { colord } from 'colord';
import { Searchbar } from 'react-native-paper';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  headerContainer: {
    flexDirection: 'column',
  },
  picker: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    flex: 1,
  },
  pickerLabel: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    color: colord(onedark.colors.white).darken(0.3).toHex(),
  },
  pickerItem: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    color: onedark.colors.white,
  },
  searchbarInput: {
    margin: 5,
    padding: 5,
    color: onedark.colors.white,
  },
  searchbar: {
    backgroundColor: onedark.colors.black,
    flex: 1,
    marginVertical: -10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = ({
  selectedValue,
  onValueChange,
  searchQuery,
  onChangeText,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Searchbar
        mode="view"
        inputStyle={styles.searchbarInput}
        style={styles.searchbar}
        placeholder="Search"
        placeholderTextColor={colord(onedark.colors.white).darken(0.3).toHex()}
        showDivider={false}
        iconColor={colord(onedark.colors.white).darken(0.03).toHex()}
        value={searchQuery}
        onChangeText={onChangeText}
      />
      <Picker
        style={styles.picker}
        dropdownIconColor={onedark.colors.white}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        itemStyle={styles.pickerItem}
        mode="dropdown"
      >
        <Picker.Item
          style={styles.pickerLabel}
          label="Sort by"
          enabled={false}
        />
        <Picker.Item
          label="Latest first"
          value="latest"
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Oldest first"
          value="oldest"
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Highest Rated first"
          value="rateDesc"
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Lowest Rated first"
          value="rateAsc"
          style={styles.pickerItem}
        />
      </Picker>
    </View>
  );
};

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchRepos = async (keyword) => {
      await refetch({ searchKeyword: keyword });
    };

    if (debouncedSearch) {
      fetchRepos(debouncedSearch.trim());
    } else fetchRepos(undefined);
  }, [debouncedSearch]);

  if (loading) {
    return (
      <View>
        <Text>Loading data...</Text>
      </View>
    );
  }

  const handleSortChange = async (value) => {
    setSelectedSort(value);

    const sortOptions = {
      latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
      oldest: { orderBy: 'CREATED_AT', orderDirection: 'ASC' },
      rateDesc: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
      rateAsc: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
    };
    await refetch(sortOptions[value]);
  };

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={
        <ListHeader
          selectedValue={selectedSort}
          onValueChange={(value) => handleSortChange(value)}
          searchQuery={searchQuery}
          onChangeText={setSearchQuery}
        />
      }
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
