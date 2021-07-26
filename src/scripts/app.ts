import "../scss/main.scss";

import "bootstrap";
import $ from "jquery";
import Arweave from 'arweave';
import Account from "./account";
import ArDB from '@textury/ardb';

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const ardb = new ArDB(arweave);

const account = new Account();

$(() => {
  ardb.search('transactions').appName('TODO224466').find().then(async (txs) => {
    const $list = $('#itemsList');

    for(const tx of txs) {
      const res = await arweave.api.get(`${tx.id}`);
      $list.append(`<li>${res.data}</li>`);
    }
  });

  $('#itemAdd').on('submit', async e => {
    e.preventDefault();

    const $input = $('#inputItem');
    const $list = $('#itemsList');

    const todo = $input.val().toString();

    const tx = await arweave.createTransaction({
      data: todo
    });

    tx.addTag('App-Name', 'TODO224466');

    await arweave.transactions.sign(tx);
    await arweave.transactions.post(tx);

    $list.append(`<li>${todo}</li>`);

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