import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANT: `${CONFIG.BASE_URL}/list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,

  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  SEARCH_RESTAURANT: `${CONFIG.BASE_URL}/search`,
};

export default API_ENDPOINT;
