import "../scss/main.scss";

import "bootstrap";
import * as $ from "jquery";
import Arweave from 'arweave';
import Account from "./account";

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const account = new Account();

$(() => {
  $('#itemAdd').on('submit', async e => {
    e.preventDefault();

    const $input = $('#inputItem');
    const $list = $('#itemsList');

    $list.append(`<li>${$input.val()}</li>`);

    $input.val('');
  });

  $('#login').on('click', async e => {
    e.preventDefault();
    await account.login();
  });

  $('#logout').on('click', async e => {
    e.preventDefault();
    await account.logout();
  });
});