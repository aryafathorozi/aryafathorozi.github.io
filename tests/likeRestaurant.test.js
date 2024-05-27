import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('menyukai sebuah restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('harus menampilkan tombol suka ketika restaurant tersebut belum pernah disukai sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it('tidak boleh menampilkan tombol tidak suka ketika restaurant belum pernah disukai sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('harus bisa menyukai restaurant', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // memastikan restaurant berhasil disukai
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('tidak boleh menyukai restaurant lagi ketika sudah disukai', async () => {
    await TestFactories.createLikeButtonPresenter({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('tidak boleh menyukai restaurant jika tidak memiliki id', async () => {
    await TestFactories.createLikeButtonPresenter({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
