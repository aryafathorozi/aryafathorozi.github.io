class LoadIcon extends HTMLElement {
  // _shadowRoot = null;
  // _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      .load-icon {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        
        .icon {
          margin-top: 30%;
          position: absolute;
          top: -15px;
          transform: scale(1.5);
        }
        .loading {
          height: 10px;
          width: 1px;
          position: absolute;
          animation: rotate 3.5s linear infinite;
        }
        .loading .spinner {
          top: 30px;
          height: 10px;
          width: 10px;
          background-color: #442a00;
          border-radius: 50%;
          position: relative;
        }
        .text-icon {
          position: absolute;
          margin-top: 40%;
          font-size: 20px;
          font-weight: 900;
        
          color: #442a00;
        }
        
        @keyframes rotate {
          30% {
            transform: rotate(220deg);
          }
          40% {
            transform: rotate(450deg);
            opacity: 1;
          }
          75% {
            transform: rotate(720deg);
            opacity: 1;
          }
          76% {
            opacity: 0;
          }
          100% {
            transform: rotate(0deg);
            opacity: 0;
          }
        }
        
        .loading:nth-child(1) {
          animation-delay: 0.15s;
        }
        .loading:nth-child(2) {
          animation-delay: 0.3s;
        }
        .loading:nth-child(3) {
          animation-delay: 0.45s;
        }
        .loading:nth-child(4) {
          animation-delay: 0.6s;
        }
        .loading:nth-child(5) {
          animation-delay: 0.75s;
        }
        .loading:nth-child(6) {
          animation-delay: 0.9s;
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
          <div class="load-icon">
              <div class="icon">
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
                  <div class="loading">
                      <div class="spinner"></div>
                  </div>
              </div>
              <div class="text-icon">Silahkan Tunggu</div>
          </div>
        `;
  }
}

customElements.define('load-icon', LoadIcon);
