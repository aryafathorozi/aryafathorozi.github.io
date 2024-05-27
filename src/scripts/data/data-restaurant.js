import data from '../../public/data/DATA.json';

class dataRestaurant {
  static getDataRestaurant() {
    return data.restaurants;
  }
}

export default dataRestaurant;
