import '../../webComponent/list-item';
import RestaurantDB from '../../data/list-restaurantdb';
import SearchRestaurant from '../../utils/search-restaurant-initiator';

const ListRestaurant = {
  async render() {
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
                    <h2>List Restaurants</h2>
                </div>
                <div class="search-restaurant">
                  <form action="" id="formSearch">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      autocomplete="off"
                      placeholder="mencari restaurant......."
                    />
                    <button id="buttonSearch">search</button>
                  </form>
                </div>
                <list-restaurant class="list-restaurant"></list-restaurant>
            </section>
        </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDB.list();
    const restaurantListElement = document.querySelector('list-restaurant');
    const formSearchRestaurant = document.querySelector('#formSearch');
    const buttonSearch = document.querySelector('#buttonSearch');

    buttonSearch.addEventListener('click', async (event) => {
      event.preventDefault();
      const searchValue = formSearchRestaurant.elements.search.value;

      console.log(searchValue);
      if (searchValue !== '' && searchValue !== null) {
        const restaurantSrh = await SearchRestaurant.init(formSearchRestaurant);
        const dataRestaurant = restaurantSrh.map((restaurant) => {
          const listItemElement = document.createElement('list-item');
          listItemElement.list = restaurant;
          return listItemElement;
        });

        restaurantListElement.innerHTML = '';
        restaurantListElement.append(...dataRestaurant);
      } else {
        const dataRestaurant = restaurants.restaurants.map((restaurant) => {
          const listItemElement = document.createElement('list-item');
          listItemElement.list = restaurant;
          return listItemElement;
        });

        restaurantListElement.innerHTML = '';
        restaurantListElement.append(...dataRestaurant);
      }
    });
    const dataRestaurant = restaurants.restaurants.map((restaurant) => {
      const listItemElement = document.createElement('list-item');
      listItemElement.list = restaurant;
      return listItemElement;
    });

    restaurantListElement.innerHTML = '';
    restaurantListElement.append(...dataRestaurant);
  },
};

export default ListRestaurant;
