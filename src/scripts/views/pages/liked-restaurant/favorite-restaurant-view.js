import '../../../webComponent/list-item';
import { createFavoriteTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
          <div id='main-content'>    
            <section class='hero-restaurant'>
                <picture>
                  <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg">
                  <img src='./images/hero-image_2-large.jpg' alt='images hero' />
                </picture>
            </section>
            <section class='container-list'>
              <div class='title'>
                <h2>List Favorite Restaurants</h2>
              </div>
              <div class="search-restaurant">
                <form action="" id="formSearch">
                  <input id='query' type='text'>
                </form>
              <div>  
              <list-restaurant id="restaurants" class ="restaurants"></list-restaurant>
            </section>
          </div>
      `;
  }

  // getFavoriteRestaurantTemplate() {
  //   return `
  //     <div id='main-content'>
  //       <section class='hero-restaurant'>
  //         <img src='./images/heros/hero-image_2.jpg' alt='' />
  //       </section>
  //       <section class='container-list'>
  //         <div class='title'>
  //           <h2>List Favorite Restaurants</h2>
  //         </div>
  //         <list-restaurant id="restaurants" class ="restaurants"></list-restaurant>
  //       </section>
  //     </div>
  //   `;
  // }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurant(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createFavoriteTemplate(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant_not_found">
        Tidak ada Restaurant untuk ditampilkan
      </div>
    `;
  }
}
export default FavoriteRestaurantView;
