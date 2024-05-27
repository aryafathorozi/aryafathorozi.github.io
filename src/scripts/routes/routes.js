import DetailRestaurant from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import ListRestaurant from '../views/pages/list';

const routes = {
  '/': ListRestaurant,
  '/list': ListRestaurant,
  '/detail-restaurant/:id': DetailRestaurant,
  '/favorite': Favorite,
};

export default routes;
