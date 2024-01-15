import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../redux/reducers';
import {fetchUsers} from '../redux/actions/userActions'; // Import the deleteAlbum action
import {useNavigation} from '@react-navigation/native';
import Divider from '../reusable/Divider';

interface User {
  id: number;
  name: string;
  albums: Album[];
}

interface Album {
  id: number;
  title: string;
}

interface UsersScreenProps {
  users: User[];
  fetchUsers: () => void;
}

const UsersScreen: React.FC<UsersScreenProps> = ({users, fetchUsers}) => {
  const navigation = useNavigation();
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleAlbumPress = (albumId: number, albumTitle: string) => {
    navigation.navigate('AlbumDetail', {albumId, title: albumTitle});
  };

  const handleDeleteAlbum = (userId: number, albumId: number) => {
    const updatedUsers = localUsers.map(user => {
      if (user.id === userId) {
        const updatedAlbums = user.albums.filter(album => album.id !== albumId);
        return {...user, albums: updatedAlbums};
      }
      return user;
    });

    setLocalUsers(updatedUsers);
  };

  return (
    <View style={styles.container}>
      {!users ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          testID="loading-indicator"
        />
      ) : (
        <FlatList
          data={localUsers}
          keyExtractor={user => user.id.toString()}
          renderItem={({item}) => (
            <View>
              <Text style={styles.userName} testID={`user-name-${item.id}`}>
                {item.name}
              </Text>
              {item.albums && (
                <FlatList
                  data={item.albums || []}
                  keyExtractor={album => album.id.toString()}
                  renderItem={({item: album}) => (
                    <View>
                      <View style={styles.albumContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            handleAlbumPress(album.id, album.title)
                          }
                          testID={`album-title-${album.id}`}>
                          <View style={styles.albumTitleContainer}>
                            <Text
                              numberOfLines={2}
                              style={styles.albumTitle}
                              testID={`album-title-text-${album.id}`}>
                              {album.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteAlbum(item.id, album.id)}
                          style={styles.deleteButton}
                          testID={`delete-button-${album.id}`}>
                          <Text style={styles.deleteButtonText}>-</Text>
                        </TouchableOpacity>
                      </View>
                      <Divider
                        orientation="horizontal"
                        width={2}
                        color="white"
                      />
                    </View>
                  )}
                  scrollIndicatorInsets={{right: 1}}
                />
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    users: state.users,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
  },
  albumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '7.5%',
    marginBottom: 10,
  },
  albumTitleContainer: {
    flex: 1,
    height: 60,
    width: '90%',
    justifyContent: 'center',
  },
  albumTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, {fetchUsers})(UsersScreen);
