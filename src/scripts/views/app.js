import DrawerInitiator from '../utils/drawer-initiator';
import UrlPages from '../routes/url-pages';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlPages.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElement = document.querySelector('.skip-link');
    skipLinkElement.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(skipLinkElement);
      document.querySelector('#maincontent').focus();
    });
  }
}

export default App;
