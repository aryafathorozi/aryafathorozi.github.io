import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const restaurantApi = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
  })
);

const restaurantImage = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-images-api',
  })
);

const iconRestaurant = new Route(
  ({ url }) => url.href.startsWith('https://use.fontawesome.com/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-icon',
  })
);

const iconAwesome = new Route(
  ({ url }) => url.href.startsWith(
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
  ),
  new StaleWhileRevalidate({
    cacheName: 'icon-awesome-css',
  })
);

const iconAwesomeCss = new Route(
  ({ url }) => url.href.startsWith(
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0'
  ),
  new StaleWhileRevalidate({
    cacheName: 'icon-awesome',
  })
);

const fontsGoogle = new Route(
  ({ url }) => url.href.startsWith(
    'https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap'
  ),
  new StaleWhileRevalidate({
    cacheName: 'fonts-google-api',
  })
);

const fontsGoogleStatic = new Route(
  ({ url }) => url.href.startsWith('https://fonts.gstatic.com/'),
  new StaleWhileRevalidate({
    cacheName: 'google-static-api',
  })
);

registerRoute(restaurantApi);
registerRoute(restaurantImage);
registerRoute(iconRestaurant);
registerRoute(iconAwesome);
registerRoute(fontsGoogle);
registerRoute(fontsGoogleStatic);
registerRoute(iconAwesomeCss);
