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

import Vue from 'vue/dist/vue.esm'
import draggable from 'vuedraggable';
import store from 'stores/list';
import { mapGetters, mapActions } from 'vuex';
import List from 'components/list';
import Newlist from 'components/newlist';

document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      // el: el ES6 若 key value 一樣可寫一次就好
      el,
      store,
      // data: {
      // 本來是用 JSON.parse 將整包 lists 傳進 data，目前改用 Vuex
      //   lists: JSON.parse(el.dataset.lists)
      // },
      computed: {
        // ...mapGetters(["lists"])
        lists: {
          get() {
            return this.$store.state.lists;
          },

          set(value) {
            this.$store.commit('UPDATE_LISTS', value);
          }
        }
      },
      // 註冊你要傳入的元件
      components: { List, Newlist, draggable },
      methods: {
        ...mapActions(["loadList", "moveList"]),
      },
      beforeMount() {
        this.loadList();
      }
    });
  }
})