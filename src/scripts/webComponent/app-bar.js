import App from '../views/app';
import LoadIconInitiator from '../utils/load-icon-initiator';
import swRegister from '../utils/sw-register';

class AppBar extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
       .header-content {
          background-color: #fff2bc;
          display: grid;
          grid-template-columns: 2fr 1fr;
          height: 80px;

          .header_logo {
            height: 80px;
            display: inline-flex;
          }

          img{
            height: 80px; 
            width: 80px; 
          }

          h1 {
            align-content: center;
            color: #442a00;
          
            text-align: center;
            letter-spacing: 2px;
          }

          nav ul.fix-nav {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3px;

            li.hideDropdown{
              list-style-type: none;
              justify-self: center;
            }

            li#showDropdown{
              display: none;
            }

            li a {
              text-decoration: none;
              color: #442a00;
            
              font-size: 25px;
              letter-spacing: 2px;
              font-weight: 500;
              padding: 0px 5px;
            
              border-bottom: 1px solid transparent;
              transition: border-bottom 0.3s ease;

              &:hover {
                color: #e89105;
                border-bottom: 3px solid #442a00;
              }
            }
          }
    
          nav ul.dropdown-menu {
            list-style: none;
            display: none;
            position: fixed;
            top: 0;
            right: 0;
            margin-top: auto;
            height: 100vh;
            width: 50%;
            heigth: 100%;
            z-index: 999;
            background-color: rgb(255, 242, 188, 0.95);
            backdrop-filter: blur(10);
            color: black;
            box-shadow: -3px 0 20px white;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            transition: display 0.5s ease;

            li {
              width: 100%;
              margin: 30px 10px 30px 10px;
              
              a {
                font-size: 20px;
                margin-top: 200px;
                width: 100%;
                text-decoration: none;
                color: #442a00;
              }
            }
          }
        }
      

      @media screen and (max-width: 1200px) {
        .header-content {
          grid-template-columns: 2fr 1.5fr;
            
          nav ul.fix-nav li.hideDropdown {
              padding: 6px 0px; 
          }

          nav ul.fix-nav li.hideDropdown a {          
             font-size: 20px;
          }
        }
      }

      @media screen and (max-width: 768px) {
        .header-content nav ul.fix-nav {
          grid-template-columns: 1fr;

          li.hideDropdown {
            display: none;
          }

          li#showDropdown {
            display: block;
            justify-self: end;
            padding: 7px 30px; 
          }
        }
      }

      @media screen and (max-width: 576px) {
        .header-content {
          grid-template-columns: 3fr 1fr;

          h1 {
            font-size: 1.2em;
          }

          nav ul.dropdown-menu li a {
            min-width: 44px;
            min-height: 44px;
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

    const iconHamburger = this.shadowRoot.querySelector('#showDropdown');
    const closeDropdownMenu = this.shadowRoot.querySelector('.closeDropdown');

    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');

    iconHamburger.addEventListener('click', () => {
      dropdownMenu.style.display = 'block';
    });

    closeDropdownMenu.addEventListener('click', () => {
      dropdownMenu.style.display = 'none';
    });

    iconHamburger.addEventListener('keyup', (event) => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        dropdownMenu.style.display = 'block';
      }
    });

    closeDropdownMenu.addEventListener('keyup', (event) => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        dropdownMenu.style.display = 'none';
      }
    });

    const mainContent = document.querySelector('#maincontent');

    const app = new App({
      button: iconHamburger,
      drawer: dropdownMenu,
      content: mainContent,
    });

    window.addEventListener('hashchange', () => {
      location.reload();
      app.renderPage();
    });

    const loadIcon = document.querySelector('load-icon');
    LoadIconInitiator.init(loadIcon);
    window.addEventListener('load', () => {
      app.renderPage();
      swRegister();
    });
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="header-content">
            <div class="header_logo">
                <picture>
                  <source media="(max-width: 600px)" srcset="./images/logo-apps-1-small.jpg">
                  <img src='./images/logo-apps-1-large.jpg' alt='images hero'/>
                </picture>
                <h1>KARES APPS</h1>
            </div>
            <nav>
                <ul class="fix-nav">
                    <li class="hideDropdown"><a href="/">Home</a></li>
                    <li class="hideDropdown"><a href="#/favorite">Favorite</a></li>
                    <li class="hideDropdown"><a href="https://www.linkedin.com/in/muhammad-arya-fathorozi-40a7b024a/" target="_blank">About Us </a></li>
                    <li onclick="" id="showDropdown">
                        <svg alt="show dropdown" tabindex="0" role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            height="35"
                            viewBox="0 -960 960 960"
                            width="35"
                            style="color: aliceblue"
                            >
                            <path
                                d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
                            />
                        </svg>
                    </li>
                </ul>

                <ul class="dropdown-menu">
                    <li class="closeDropdown">
                        <svg alt="close dropdown" tabindex="0" role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            >
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                            />
                        </svg>
                    </li>
                    <li><a href="/">Home</a></li>
                    <li><a href="#/favorite">Favorite</a></li>
                    <li><a href="https://www.linkedin.com/in/muhammad-arya-fathorozi-40a7b024a/" target="_blank">About Us </a></li>
                </ul>
            </nav>
        </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
