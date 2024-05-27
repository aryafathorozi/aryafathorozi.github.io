const { locator } = require('codeceptjs');
const { async } = require('regenerator-runtime');

Feature('Menambah review');

Scenario('menambahkan review di salah satu restaurant', async ({ I }) => {
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

  I.seeElement('#name');
  I.fillField('#name', 'Alvaro Ardiansyah');

  I.seeElement('#review');
  I.fillField('#review', 'Cafe sangat bagus dan bersih');

  I.seeElement('#buttonAddReview');
  I.click('#buttonAddReview');

  I.waitForElement('.review', 5);

  const reviewer = await I.executeScript(() => {
    const name = document.querySelectorAll('.review');
    const reviewName = name[name.length - 1].querySelector('p');
    return reviewName.textContent;
  });

  I.say(`${reviewer}`);
});
