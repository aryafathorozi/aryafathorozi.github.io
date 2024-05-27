import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDB {
  static async list() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
    return response.json();
  }
}

export default RestaurantDB;
