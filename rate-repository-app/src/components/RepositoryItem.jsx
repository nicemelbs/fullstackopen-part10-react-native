import Text from './Text';
import ListItemContainer from './ListItemContainer';
import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { onedark } from './theme';
import { shorten } from '../utils/helpers';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 3,
  },

  heading: {
    flexDirection: 'row',
    columnGap: 15,
  },

  nameAndDescription: {
    flexDirection: 'column',
    rowGap: 5,
    flexShrink: 1,
  },

  stats: {
    paddingTop: 10,
    flexDirection: 'row',
  },

  statLine: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  languageItem: {
    backgroundColor: onedark.colors.yellow,
    borderRadius: 3,
    padding: 3,

    text: {
      color: onedark.colors.black,
    },
  },
});

const StatLine = ({ label, stat }) => {
  return (
    <View style={styles.statLine}>
      <Text fontWeight="bold" style={{ alignSelf: 'center' }}>
        {shorten.format(stat)}
      </Text>
      <Text style={{ alignSelf: 'center' }}>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <ListItemContainer testID="repositoryItem">
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <View style={styles.heading}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
          <View style={styles.nameAndDescription}>
            <Text fontSize="subheading" fontWeight="bold">
              {item.fullName}
            </Text>
            <Text>{item.description}</Text>
            <View style={styles.languageContainer}>
              <View style={styles.languageItem}>
                <Text style={styles.languageItem.text}>{item.language}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          <StatLine label="Stars" stat={item.stargazersCount} />
          <StatLine label="Forks" stat={item.forksCount} />
          <StatLine label="Reviews" stat={item.reviewCount} />
          <StatLine label="Rating" stat={item.ratingAverage} />
        </View>
      </Pressable>
    </ListItemContainer>
  );
};

export default RepositoryItem;
