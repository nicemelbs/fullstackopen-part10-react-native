import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import theme, { onedark } from './theme';
import { colord } from 'colord';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  picker: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
  },
  pickerLabel: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    color: colord(onedark.colors.white).darken(0.3).toHex(),
  },
  pickerItem: {
    backgroundColor: colord(onedark.colors.black).lighten(0.05).toHex(),
    color: onedark.colors.white,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ selectedValue, onValueChange }) => {
  return (
    <Picker
      style={styles.picker}
      dropdownIconColor={onedark.colors.white}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      itemStyle={styles.pickerItem}
      mode="dropdown"
    >
      <Picker.Item style={styles.pickerLabel} label="Sort by" enabled={false} />
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
  );
};

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  const [selectedSort, setSelectedSort] = useState('latest');

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
        <SortPicker
          selectedValue={selectedSort}
          onValueChange={(value) => handleSortChange(value)}
        />
      }
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
