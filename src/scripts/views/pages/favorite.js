import '../../webComponent/list-item';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant';
import FavoriteRestaurantView from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const Favorite = {
  // async render() {
  //   return `
  //       <div id='main-content'>
  //           <section class='hero-restaurant'>
  //               <img src='./images/heros/hero-image_2.jpg' alt='' />
  //           </section>
  //           <section class='container-list'>
  //               <div class='title'>
  //                   <h2>List Favorite Restaurants</h2>
  //               </div>
  //               <list-restaurant></list-restaurant>
  //           </section>
  //       </div>
  //   `;
  // },
  // async afterRender() {
  //   const favoriteRestaurant = await FavoriteRestaurantIdb.getAllRestaurants();
  //   const restaurantListElement = document.querySelector('list-restaurant');
  //   restaurantListElement.innerHTML = '';
  //   console.log(favoriteRestaurant);
  //   const dataRestaurant = favoriteRestaurant.map((restaurant) => {
  //     const listItemElement = document.createElement('list-item');
  //     listItemElement.list = restaurant;
  //     return listItemElement;
  //   });
  //   restaurantListElement.append(...dataRestaurant);
  // },
  async render() {
    const view = new FavoriteRestaurantView();
    return view.getTemplate();
  },
  async afterRender() {
    const view = new FavoriteRestaurantView();
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
    new FavoriteRestaurantSearchPresenter({
      favoriteRestaurant: FavoriteRestaurantIdb,
      view,
    });
  },
};

export default Favorite;
