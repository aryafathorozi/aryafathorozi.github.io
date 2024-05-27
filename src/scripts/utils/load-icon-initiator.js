const LoadIconInitiator = {
  async init(icons) {
    this._icons = icons;

    await this._renderLoadIcon();
  },
  async _renderLoadIcon() {
    this._icons.style.display = 'block';
    const loadIconAnimation = setInterval(() => {
      if (!this._icons.style.opacity) {
        this._icons.style.opacity = 1;
      }
      if (this._icons.style.opacity > 0) {
        this._icons.style.opacity -= 0.1;
      } else {
        clearInterval(loadIconAnimation);
        this._icons.style.display = 'none';
      }
    }, 300);
  },
};

export default LoadIconInitiator;
