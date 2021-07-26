import "../scss/main.scss";

import "bootstrap";
import $ from "jquery";

$(() => {
  $('#itemAdd').on('submit', e => {
    e.preventDefault();

    const $input = $('#inputItem');
    const $list = $('#itemsList');

    $list.append(`<li>${$input.val()}</li>`);

    $input.val('');
  });
});