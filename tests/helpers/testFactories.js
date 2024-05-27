import { async } from 'regenerator-runtime';
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant';

const createLikeButtonPresenter = async (restaurant) => {
  await LikeButtonInitiator.init({
    LikeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createLikeButtonPresenter };
