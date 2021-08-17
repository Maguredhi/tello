import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
// import 上一層的 stylesheets 裡的所有檔案
import "../stylesheets"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

// vue.js

import Vue from 'vue/dist/vue.esm';

document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      // el: el ES6 若 key value 一樣可寫一次就好
      el,
      data: {
        lists: JSON.parse(el.dataset.lists)
      }
    });
  }
})