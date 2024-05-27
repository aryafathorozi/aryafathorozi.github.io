import API_ENDPOINT from '../globals/api-endpoint';

const AddReviewInitiator = {
  async init({ formAddReview, idRestaurant }) {
    this._formAddReview = formAddReview;
    this._idRestaurant = idRestaurant;
    await this._renderForm();
  },

  async _renderForm() {
    const form = this._formAddReview;
    const addButton = form.elements.buttonAddReview;
    addButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const inputId = this._idRestaurant;
      const inputName = form.elements.name.value;
      const inputReview = form.elements.review.value;

      const newReview = {
        id: inputId,
        name: inputName,
        review: inputReview,
      };
      await this._renderAddReview(newReview);
    });
  },

  async _renderAddReview(newReview) {
    try {
      const response = await fetch(`${API_ENDPOINT.ADD_REVIEW}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        throw new Error('gagal menambahkan review');
      }

      const responseJson = await response.json();
      await this._renderClearInput();
      await location.reload();
      return responseJson;
    } catch (error) {
      return error;
    }
  },

  async _renderClearInput() {
    const form = this._formAddReview;
    const inputName = form.elements.name;
    const inputReview = form.elements.review;
    inputName.value = '';
    inputReview.value = '';
  },
};

export default AddReviewInitiator;
