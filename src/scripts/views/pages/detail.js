import UrlPages from '../../routes/url-pages';
import RestaurantDB from '../../data/list-restaurantdb';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import AddReviewInitiator from '../../utils/add-review-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant';

import {
  createRestaurantDetailTemplate,
  createList,
} from '../templates/template-creator';

const DetailRestaurant = {
  async render() {
    return `
        <div id='detail'></div>
        <div id='likeButtonContainer'></div>
    `;
  },

  async afterRender() {
    const url = UrlPages.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDB.detail(url.id);
    console.log(restaurant.restaurant.id);
    const restaurantElement = document.querySelector('#detail');
    restaurantElement.innerHTML = createRestaurantDetailTemplate(restaurant);
    createList(restaurant);
    const formAddElement = document.querySelector('#formAddReview');

    AddReviewInitiator.init({
      formAddReview: formAddElement,
      idRestaurant: restaurant.restaurant.id,
    });

    LikeButtonInitiator.init({
      LikeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        pictureId: restaurant.restaurant.pictureId,
        rating: restaurant.restaurant.rating,
        name: restaurant.restaurant.name,
        address: restaurant.restaurant.address,
        city: restaurant.restaurant.city,
        description: restaurant.restaurant.description,
      },
    });
  },
};

export default DetailRestaurant;
