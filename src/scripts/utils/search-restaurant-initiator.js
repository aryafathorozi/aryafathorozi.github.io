import API_ENDPOINT from '../globals/api-endpoint';

const SearchRestaurant = {
  async init(formSearch) {
    const searchValue = formSearch.elements.search.value;
    const searchValueLowerCase = searchValue.toLowerCase();

    const url = `${API_ENDPOINT.SEARCH_RESTAURANT}?q=${searchValueLowerCase}`;
    console.log(url);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error('gagal menambahkan review');
      }
      const responseJson = await response.json();
      console.log(await responseJson.restaurants);

      return await responseJson.restaurants;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default SearchRestaurant;
