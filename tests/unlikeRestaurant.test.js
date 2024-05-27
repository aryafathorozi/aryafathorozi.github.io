import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('batal menyukai sebuah restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('harus menampilkan widget yang berbeda ketika restaurant disukai', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('tidak boleh menampilkan widget seperti ketika restaurant telah disukai', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it('harus dapat menghapus restaurant yang disukai dari daftar', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('tidak boleh menimbulkan kesalahan ketika pengguna klik widget yang tidak disukai', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
