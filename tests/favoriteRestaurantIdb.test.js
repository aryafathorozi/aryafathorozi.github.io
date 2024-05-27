import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant';

describe('implementasi tes kontrak idb favorite restaurant', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(
      async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      }
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
