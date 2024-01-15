import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

interface Photo {
  id: number;
  thumbnailUrl: string;
}

const AllPhotosScreen: React.FC = () => {
  const [allPhotos, setAllPhotos] = React.useState<Photo[]>([]);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/photos',
        );
        setAllPhotos(response.data);
      } catch (error) {
        console.error('Error fetching all photos:', error);
      }
    };

    fetchAllPhotos();
  }, []);

  return (
    <View testID="all-photos-screen">
      {!allPhotos ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          testID="loading-indicator"
        />
      ) : (
        <FlatList
          data={allPhotos}
          keyExtractor={photo => photo.id.toString()}
          numColumns={3}
          renderItem={({item}) => (
            <Image
              source={{uri: item.thumbnailUrl}}
              style={styles.photo}
              testID={`photo-${item.id}`}
            />
          )}
          scrollIndicatorInsets={{right: 1}}
        />
      )}
    </View>
  );
};

const {width} = Dimensions.get('window');
const photoSize = width / 3 - 10;

const styles = StyleSheet.create({
  photo: {
    width: photoSize,
    height: photoSize,
    margin: 5,
  },
});

export default AllPhotosScreen;
