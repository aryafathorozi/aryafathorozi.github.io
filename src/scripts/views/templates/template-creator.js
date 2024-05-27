import '../../webComponent/list-item';
import '../../webComponent/list';

const createRestaurantDetailTemplate = (data) => `
    <section id='detail-header'>
          <div class='img-restaurant'>
            <span> rating </span>
            <picture>
              <source type="image/webp" srcset="https://restaurant-api.dicoding.dev/images/small/${data.restaurant.pictureId}" alt="restaurant ${data.restaurant.name}">
              <source type="image/jpeg" srcset="https://restaurant-api.dicoding.dev/images/small/${data.restaurant.pictureId}" alt="restaurant ${data.restaurant.name}">
              <img loading="lazy" src="https://restaurant-api.dicoding.dev/images/small/${data.restaurant.pictureId}" alt="restaurant ${data.name}" />
            </picture>
          </div>
          <div class='description'>
            <div id='list-category'>
              <h2>${data.restaurant.name}</h2>
            </div>
            <p>
              <span><b>Alamat &nbsp; : </b> ${data.restaurant.address}, ${data.restaurant.city}</span>
            </p>
            <p>
              <span id='descriptionValueMore'>
                <b>Description &nbsp; : </b>
                ${data.restaurant.description} 
              </span>
              <span id='descriptionValueLess'>
                <b>Description &nbsp; : </b>
                ${data.restaurant.description} 
              </span>
              <span id='readMore'>
                read more.
              </span>
              <span id='readLess'>
                read less.
              </span>
            </p>
          </div>
        </section>
        <section id='foodAndDrink'>
          <div id='title-foodAndDrink'>
            <h2>Foods And Drinks</h2>
          </div>
          <div class='listFoodAndDrink'>
            <div class='list-foods'>
              <h3>List Foods :</h3>
              <div id='food'></div>
            </div>
            <div class='list-drinks'>
              <h3>List Drink :</h3>
              <div id='drink'></div>
            </div>
          </div>
        </section>
        <section id='customerReview'>
          <div id='titleCustomerReview'>
            <h2>Review By Customer</h2>
          </div>
          <div class='list-review'></div>
        </section>
        <section id="addReview">
          <div id="titleAddReview">
            <h2>Add Review</h2>
          </div>
          <div class="inputAddListReview">
            <form action="" id="formAddReview">
              <div class="input-name">
                <label for="name">Masukkan Nama :</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  autocomplete="off"
                  aria-describedby="nameValidation"
                />
              </div>
              <div class="input-review">
                <label for="review">Masukkan Review :</label>
                <textarea
                  name="review"
                  id="review"
                  required
                  autocomplete="off"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div class="buttonAddReview">
                <button type="submit" id="buttonAddReview">Tambah Review</button>
              </div>
            </form>
          </div>
        </section>
`;

const createList = (data) => {
  const categoriesContainer = document.querySelector('#list-category');
  const foodsContainer = document.querySelector('#food');
  const drinksContainer = document.querySelector('#drink');
  const listReviewContainer = document.querySelector('.list-review');

  data.restaurant.categories.forEach((category) => {
    const span = document.createElement('span');
    span.textContent = category.name;
    categoriesContainer.appendChild(span);
  });

  const dataFoods = data.restaurant.menus.foods;
  const dataDrinks = data.restaurant.menus.drinks;
  dataFoods.forEach((food) => {
    const span = document.createElement('span');
    span.textContent = food.name;
    foodsContainer.appendChild(span);
  });
  dataDrinks.forEach((drink) => {
    const span = document.createElement('span');
    span.textContent = drink.name;
    drinksContainer.appendChild(span);
  });

  const dataReview = data.restaurant.customerReviews;
  dataReview.forEach((review) => {
    const containerReview = document.createElement('div');
    containerReview.classList.add('review');
    containerReview.innerHTML = `
        <p><b>Nama :</b>${review.name}</p>
        <p><b>Tanggal :</b>${review.date}</p>
        <p>
            ${review.review}
        </p>
    `;
    listReviewContainer.appendChild(containerReview);
  });

  const readMoreElement = document.querySelector('#readMore');
  const readLessElement = document.querySelector('#readLess');
  const valueMoreContainer = document.querySelector('#descriptionValueMore');
  const valueLessContainer = document.querySelector('#descriptionValueLess');
  readMoreElement.addEventListener('click', () => {
    valueMoreContainer.style.display = 'block';
    valueLessContainer.style.display = 'none';

    readMoreElement.style.display = 'none';
    readLessElement.style.display = 'block';
  });
  readLessElement.addEventListener('click', () => {
    valueLessContainer.style.display = '-webkit-box';
    valueMoreContainer.style.display = 'none';

    readLessElement.style.display = 'none';
    readMoreElement.style.display = 'block';
  });
};

const createFavoriteTemplate = (restaurants) => `
    <div class="list-item">
      <span class="rating"> rating ${restaurants.rating || '-'} </span>
      <picture>
        <source type="image/webp" srcset="https://restaurant-api.dicoding.dev/images/small/${
  restaurants.pictureId
}" alt="restaurant ${restaurants.name}">
        <source type="image/jpeg" srcset="https://restaurant-api.dicoding.dev/images/small/${
  restaurants.pictureId
}" alt="restaurant ${restaurants.name}">
        <img loading="lazy" src="https://restaurant-api.dicoding.dev/images/small/${
  restaurants.pictureId
}" alt="restaurant ${restaurants.name}" />
      </picture>
      
      <figcaption class="restaurant"><span class="restaurant_name">${
  restaurants.name || '-'
}</span> (${restaurants.city || '-'})
      </figcaption>
      <p class="paragraf-less">
          ${restaurants.description || '-'}...
      </p>
      <p class="paragraf-more">
          ${restaurants.description || '-'}
      </p>
      <div class="list-button">
        <button class="detail-restaurant">
          <a class="detail" href="/#/detail-restaurant/${
  restaurants.id || '-'
}">Detail</a>
        </button>
      </div>
    </div>
  `;
const createLikeButtonElement = () => `
  <button aria-label='like this restaurant' id='likeButton' class='like'>
    <i class='fa fa-heart-o' aria-hidden='true'></i>
  </button>
`;

const createLikedButtonElement = () => `
  <button aria-label='unlike this restaurant' id='likeButton' class='like'>
    <i class='fa fa-heart' aria-hidden='true'></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createList,
  createLikeButtonElement,
  createLikedButtonElement,
  createFavoriteTemplate,
};
