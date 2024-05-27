import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurant = [];

const favoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurant.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurants() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurant = favoriteRestaurant.filter(
      (restaurant) => restaurant.id != id
    );
  },

  searchRestaurant(query) {
    return this.getAllRestaurants().filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('implementasi tes kontrak array favorite restaurant', () => {
  afterEach(() => {
    favoriteRestaurant = [];
  });

  itActsAsFavoriteRestaurantModel(favoriteRestaurantArray);
});
