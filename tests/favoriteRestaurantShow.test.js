import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-presenter';

describe('menampilkan semua restaurant favorite', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('ketika tidak ada restaurant yang disukai', () => {
    it('harus meminta restaurant favorite', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('harus menunjukkan informasi bahwa tidak ada restaurant yang disukai', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant_not_found').length
          ).toEqual(1);
        });

      done();

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('ketika restaurant favorite ada', () => {
    it('harus menampilkan restaurantnya', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.list-item').length).toEqual(2);

          done();
        });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 1111,
            name: 'restaurant a',
            description: 'hahaha hihihi',
            pictureId: 'gambar_1.jpg',
            city: 'malang',
            rating: 4.6,
          },
          {
            id: 2222,
            name: 'restaurant b',
            description: 'huhuhu hahaha',
            pictureId: 'gambar_2.jpg',
            city: 'jember',
            rating: 4.6,
          },
        ]),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
