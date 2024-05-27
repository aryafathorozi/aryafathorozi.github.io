class FooterContent extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
       .footer-content {
        background-color: #fff2bc;
        margin-top: 40px;
        display: grid;
        padding: 0px 10%;
        gap: 20px;
        grid-template-columns: 2fr 1.5fr;
        justify-items: center;
        border-block-start: 3px solid #fff2bc;
        box-shadow: -5px -7px 20px #fff2bc;
        
        .description,
        .menu-links {
          h3 {
            border-bottom: 3px solid #e89105;
            color: #442a00;
          }
        }

        .description p {
          text-align: justify;
          font-size: medium;
          color: #442a00;
        }
        
        .menu-links ul {
          display: flex;
          li {
            margin: 0px 30px;
            a {
              color: #442a00;
              text-decoration: none;
              font-size: medium;
              text-align: center;
              &:hover {
                color: #e89105;
              }
            }
          }
        }
      }
      
      @media screen and (max-width: 1200px) {
        .menu-links ul {
          display: block;
        }
      }
      
      @media screen and (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          justify-content: center;

          .menu-links {
            width: -webkit-fill-available;
            margin-bottom: 20px;
            display: block;


            ul li a {
              min-width: 44px;
              min-height: 44px;
            }
          } 
        }
      }
      
      @media screen and (max-width: 576px) {
        .footer-content {
          grid-template-columns: 1fr;
          padding: 0 5%;
          
          .description {
            width: 80%
          }

          .menu-links {
            width: 80%;
            ul{
              display: block;
            }
          }
        }
      

      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="footer-content">
            <div class="description">
                <h3>Description Kares Apps</h3>
                <p>
                    <b>Kares Apps</b> adalah aplikasi berbasis website yang memberikan
                    sebuah informasi katalog restaurant. List katalog restaurant merupakan
                    list restaurant yang ada di Indonesia.
                </p>
            </div>
            <div class="menu-links">
                <h3>Menu links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#/favorite">Favorite</a></li>
                    <li>
                        <a
                        href="https://www.linkedin.com/in/muhammad-arya-fathorozi-40a7b024a/"
                        target="_blank"
                        >About Us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;
  }
}

customElements.define('footer-content', FooterContent);
