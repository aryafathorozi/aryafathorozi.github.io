class List extends HTMLElement {
  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this._column = 3;
    this._gutter = 40;
  }

  connectedCallback() {
    this.render();
  }

  _updatedStyle() {
    this._style.textContent = `
       .list {
        margin: 20px 0px;
        display: grid;
        grid-template-columns: repeat(${this._column}, 300px);
        justify-content: center;
        gap: ${this.gutter}px;
      }

      @media (max-width: 1200px) {
        .list {
          grid-template-columns: repeat(2, 350px);
        }
      }

      @media (max-width: 768px) {
        .list {
          grid-template-columns: repeat(1, 70%);
        }
      }

      @media (max-width: 576px) {
        .list {
          grid-template-columns: repeat(1, 90%);
        }
      }
    `;
  }

  set column(value) {
    this._column = value;
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
        <div class="list">
            <slot></slot>
        </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
      case 'id':
        this.id = newValue;
        break;
      default:
        return;
    }

    this.render();
  }
}

customElements.define('list-restaurant', List);
