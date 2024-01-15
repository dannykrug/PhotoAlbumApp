import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UsersScreen from '../screens/UsersScreen';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import AllPhotosScreen from '../screens/AllPhotosScreen';
import {TouchableOpacity, Text} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  AlbumDetail: {title: string};
  AllPhotos: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={UsersScreen}
          options={{title: 'Home'}}
        />
        <RootStack.Screen
          name="AlbumDetail"
          component={AlbumDetailScreen}
          options={({route, navigation}) => ({
            title: route.params?.title || 'Album Detail',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllPhotos');
                }}
                style={{paddingRight: 15}}>
                <Text>⭐</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen
          name="AllPhotos"
          component={AllPhotosScreen}
          options={({navigation}) => ({
            title: 'All Photos',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{paddingRight: 15}}>
                <Text>⭐</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
