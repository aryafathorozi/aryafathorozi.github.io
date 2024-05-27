import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';

describe('mencari daftar restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurant: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant: favoriteRestaurants,
      view: view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('ketika query tidak kosong', () => {
    it('harus dapat menangkap kueri yang diketik oleh pengguna', () => {
      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);
      searchRestaurant('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('harus meminta model untuk mencari restaurant yang disukai', () => {
      favoriteRestaurants.searchRestaurant.mockImplementation(() => []);

      searchRestaurant('restaurant a');

      expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith(
        'restaurant a'
      );
    });

    it('harus menampilkan restaurant yang ditemukan oleh restaurant favorit', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.list-item').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 1111,
              name: 'restaurant abc',
              description: 'hahaha hihihi',
              pictureId: 'gambar_1.jpg',
              city: 'malang',
              rating: 4.6,
            },
            {
              id: 2222,
              name: 'restaurant abcde',
              description: 'huhuhu hahaha',
              pictureId: 'gambar_2.jpg',
              city: 'jember',
              rating: 4.6,
            },
            {
              id: 3333,
              name: 'restaurant abcdef',
              description: 'huhuhu hahaha',
              pictureId: 'gambar_2.jpg',
              city: 'jember',
              rating: 4.6,
            },
          ];
        }
        return [];
      });

      searchRestaurant('restaurant a');
    });

    it('harus menampilkan nama restaurant yang ditemukan oleh restaurant favorit', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantName = document.querySelectorAll('.restaurant_name');
          expect(restaurantName.item(0).textContent).toEqual('restaurant abc');
          // expect(restaurantName.item(0).textContent).toEqual(
          //   'restaurant abcde'
          // );
          // expect(restaurantName.item(0).textContent).toEqual(
          //   'restaurant abcdef'
          // );

          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            {
              id: 1111,
              name: 'restaurant abc',
              description: 'hahaha hihihi',
              pictureId: 'gambar_1.jpg',
              city: 'malang',
              rating: 4.6,
            },
            {
              id: 2222,
              name: 'restaurant  abcde',
              description: 'huhuhu hahaha',
              pictureId: 'gambar_2.jpg',
              city: 'jember',
              rating: 4.6,
            },
            {
              id: 3333,
              name: 'restaurant  abcdef',
              description: 'huhuhu hahaha',
              pictureId: 'gambar_2.jpg',
              city: 'jember',
              rating: 4.6,
            },
          ];
        }
        return [];
      });

      searchRestaurant('restaurant a');
    });

    it('harus ditampilkan - ketika film yang dikembalikan tidak mengandung judul', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantName = document.querySelectorAll('.restaurant_name');
          expect(restaurantName.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 4444 }];
        }
        return [];
      });

      searchRestaurant('restaurant a');
    });
  });

  describe('ketika query kosong', () => {
    it('harus menangkap query sebagai kosong', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurant('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('   ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('harus menampilkan semua restaurant favorite', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurant('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('ketika tidak ada restaurant favorite yang dapat ditemukan', () => {
    it('harus menampilkan pesan kosong', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant_not_found').length
          ).toEqual(1);

          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation((query) => []);
      searchRestaurant('restaurant a');
    });

    it('tidak boleh menampilkan restaurant apapun', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.list-item').length).toEqual(0);

          done();
        });

      favoriteRestaurants.searchRestaurant.mockImplementation((query) => []);
      searchRestaurant('restaurant a');
    });
  });
});
