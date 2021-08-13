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
import List from 'components/list';
import draggable from 'vuedraggable'

document.addEventListener("turbolinks:load", function (event) {
  let el = document.querySelector('#board');

  if (el) {
    new Vue({
      // el: el ES6 若 key value 一樣可寫一次就好
      el,
      // data: {
      // 本來是用 JSON.parse 將整包 lists 傳進 data
      //   lists: JSON.parse(el.dataset.lists)
      // },
      data: {
        lists: []
      },
      // 註冊你要傳入的元件
      components: { List, draggable },
      methods: {
        listMoved(event) {
          console.log(event);

          let data = new FormData();
          // 因 act_as_links position 是從 1 開始算，所以抓到資料後必須 +1 傳進 position
          data.append("list[position]", event.moved.newIndex + 1);

          Rails.ajax({
            // /list/2/move
            url: `/lists/${this.lists[event.moved.newIndex].id}/move`,
            type: 'PUT',
            data,
            dataType: 'json',
            success: resp => {
              console.log(resp);
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      beforeMount() {
        Rails.ajax({
          url: '/lists.json',
          type: 'GET',
          dataType: 'json',
          success: resp => {
            this.lists = resp
            console.log(resp)
          },
          error: err => {
            console.log(err)
          }
        })
      }
    });
  }
})