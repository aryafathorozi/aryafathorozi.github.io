const { locator } = require('codeceptjs');
const { async } = require('regenerator-runtime');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('menampilkan restaurant kosong yang disukai', ({ I }) => {
  I.seeElement('#query');

  I.see('TIDAK ADA RESTAURANT UNTUK DITAMPILKAN', '.restaurant_not_found');
});

Scenario('menyukai satu restaurant', async ({ I }) => {
  I.see('TIDAK ADA RESTAURANT UNTUK DITAMPILKAN', '.restaurant_not_found');

  I.amOnPage('/');
  // pause();

  I.waitForElement('list-item', 5);

  await I.executeScript(() => {
    () =>
      document
        .querySelector('list-item')
        .shadowRoot.querySelector('.detail')
        .dispatchEvent('click');
  });
  I.amOnPage('/#/detail-restaurant/rqdv5juczeskfw1e867');
  I.waitForElement('#likeButton', 5);

  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  // pause();
  I.seeElement('.restaurant_name');
  I.say('berhasil');
});

Scenario('membatalkan restaurant yang disukai', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('list-item', 5);
  await I.executeScript(() => {
    () =>
      document
        .querySelector('list-item')
        .shadowRoot.querySelector('.detail')
        .dispatchEvent('click');
  });
  I.amOnPage('/#/detail-restaurant/rqdv5juczeskfw1e867');
  I.waitForElement('#likeButton', 5);

  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.detail');
  await I.executeScript(() => {
    () => document.querySelector('.detail').dispatchEvent('click');
  });
  I.amOnPage('/#/detail-restaurant/rqdv5juczeskfw1e867');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  // pause();
});
