import axios from 'axios';
import {Dispatch} from 'redux';
import {ActionTypes} from '../types';

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );

      const usersWithAlbums = await Promise.all(
        response.data.map(async (user: any) => {
          const albumsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          );
          const userWithAlbums = {
            id: user.id,
            name: user.name,
            albums: albumsResponse.data,
          };
          return userWithAlbums;
        }),
      );

      dispatch({
        type: ActionTypes.FETCH_USERS,
        payload: usersWithAlbums,
      });
    } catch (error) {
      console.error('Error fetching users and albums:', error);
    }
  };
};
