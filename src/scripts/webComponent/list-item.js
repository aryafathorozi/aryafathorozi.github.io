import App from '../views/app';

class listItem extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  _dataRestaurant = {
    id: null,
    name: null,
    description: null,
    pictureId: null,
    city: null,
    rating: 4.6,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();

    const container = this.shadowRoot.querySelector('.list-item');
    const spanElement = this.shadowRoot.querySelector('.list-item span');
    const imgElement = this.shadowRoot.querySelector('.list-item img');

    const buttonReadMore = this.shadowRoot.querySelector('.read-more');
    const buttonReadLess = this.shadowRoot.querySelector('.read-less');
    const buttonDetail = this.shadowRoot.querySelector('.detail');

    const paragfrafMore = this.shadowRoot.querySelector('.paragraf-more');
    const paragfrafLess = this.shadowRoot.querySelector('.paragraf-less');

    buttonReadMore.addEventListener('click', () => {
      spanElement.style.display = 'none';
      imgElement.style.display = 'none';

      buttonReadMore.style.display = 'none';
      buttonReadLess.style.display = 'block';

      container.style.maxHeight = 'none';

      paragfrafLess.style.display = 'none';
      paragfrafMore.style.display = 'block';
    });

    buttonReadLess.addEventListener('click', () => {
      spanElement.style.display = 'block';
      imgElement.style.display = 'block';

      buttonReadMore.style.display = 'block';
      buttonReadLess.style.display = 'none';

      container.style.maxHeight = '700px';

      paragfrafMore.style.display = 'none';
      paragfrafLess.style.display = '-webkit-box';
    });

    const app = new App({
      button: buttonDetail,
      drawer: buttonReadMore,
      content: document.querySelector('#maincontent'),
    });

    window.addEventListener('hashchange', () => {
      app.renderPage();
    });

    window.addEventListener('load', () => {
      app.renderPage();
    });
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set list(value) {
    this._dataRestaurant = value;
    this.render();
  }

  get list() {
    return this._dataRestaurant;
  }

  _updatedStyle() {
    this._style.textContent = `
      .list-item {
        background-color: #fff;
        max-height: 700px;
        padding: 7px;
        border: 2px solid #fff2bc;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 5px 5px 10px #fff2bc;

        span {
          background-color: #fff2bc;
          position: absolute;
        
          padding: 5px 10px;
          font-weight: 600;
          border-radius: 0px 20px 0px;
          color: #442a00;
        }

        img {
          border: 2px solid #fff2bc;
          width: 100%;
          height: 50%;
          border-radius: 10px;
        }

        figcaption {
          font-weight: 600;
          text-align: center;
        }

        p.paragraf-less {
          text-align: justify;
  
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        p.paragraf-more {
          display: none;
          text-align: justify;
        }

        .list-button {
          display: flex;
          justify-content: center;
        }
        
        button {
          background-color: #442a00;
          border: none;
          margin: 5px;
          padding: 10px 15px;
          border-radius: 15px;
          color: #fff2bc;
          cursor: pointer;
          transition: background-color 0.5s ease;
          
          &:hover {
            background-color: #E89105;
            color: white;
          }

          .detail{
            text-decoration: none;
            color: #fff2bc;
            padding: 22px;
          }
        }
        
        button.detail-restaurant{
          padding: 0px 0px;
        }
        button.read-less {
          display: none;
        }
      }

      @media screen and (max-width: 576px) {
        .list-item button {
          min-width: 44px;
          min-height: 44px;
        }
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="list-item">
            <span> rating ${this._dataRestaurant.rating} </span>
            <picture>
              <source type="image/webp" srcset="https://restaurant-api.dicoding.dev/images/small/${this._dataRestaurant.pictureId}" alt="restaurant ${this._dataRestaurant.name}">
              <source type="image/jpeg" srcset="https://restaurant-api.dicoding.dev/images/small/${this._dataRestaurant.pictureId}" alt="restaurant ${this._dataRestaurant.name}">
              <img loading="lazy" src="https://restaurant-api.dicoding.dev/images/small/${this._dataRestaurant.pictureId}" alt="restaurant ${this._dataRestaurant.name}" />
            </picture>
            <figcaption>${this._dataRestaurant.name} (${this._dataRestaurant.city})</figcaption>
            <p class="paragraf-less">
                ${this._dataRestaurant.description}...
            </p>
            <p class="paragraf-more">
                ${this._dataRestaurant.description}
            </p>
            <div class="list-button">
              <button class="read-more">read more</button>
              <button class="read-less">read less</button>
              <button class="detail-restaurant">
                <a class="detail" href="/#/detail-restaurant/${this._dataRestaurant.id}">Detail</a>
              </button>
            </div>
        </div>
    `;
  }
}

customElements.define('list-item', listItem);
