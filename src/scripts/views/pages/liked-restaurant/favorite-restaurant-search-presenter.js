class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._favoriteRestaurants = favoriteRestaurant;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurant(
        this.latestQuery
      );
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }

    this._showFoundRestaurant(foundRestaurants);
  }

  _showFoundRestaurant(restaurants) {
    this._view.showFavoriteRestaurant(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
