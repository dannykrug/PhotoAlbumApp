import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const AlbumDetailScreen: React.FC = () => {
  const route = useRoute();
  const albumId = (route.params as {albumId?: string})?.albumId;

  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
        );
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    if (albumId) {
      fetchPhotos();
    }
  }, [albumId]);

  return (
    <View testID="album-detail-screen">
      {!photos ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          testID="loading-indicator"
        />
      ) : (
        <FlatList
          data={photos}
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

export default AlbumDetailScreen;
