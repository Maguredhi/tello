import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import Rails from '@rails/ujs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: []
  },

  getters: {
    lists: state => state.lists
  },

  mutations: {
    UPDATE_LISTS(state, lists) {
      state.lists = lists
    },
    REPLACE_CARD(state, card) {
      let list_index = state.lists.findIndex(list => list.id == card.list_id);
      let card_index = state.lists[list_index].cards.findIndex(item => item.id == card.id);
      state.lists[list_index].cards.splice(card_index, 1, card);
    }
  },

  actions: {
    updateCard({ commit }, { id, name }) {
      let data = new FormData();
      data.append("card[name]", name);

      Rails.ajax({
        url: `/cards/${id}/`,
        type: 'PUT',
        data,
        dataType: 'json',
        success: resp => {
          commit('REPLACE_CARD', resp);
          console.log(resp);
        },
        error: err => {
          console.log(err);
        }
      })
    },
    moveList({ commit, state }, event) {
      console.log(event);

      let data = new FormData();
      // 因 act_as_links position 是從 1 開始算，所以抓到資料後必須 +1 傳進 position
      data.append("list[position]", event.moved.newIndex + 1);

      Rails.ajax({
        // /list/2/move
        url: `/lists/${state.lists[event.moved.newIndex].id}/move`,
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
    },
    loadList({ commit }) {
      Rails.ajax({
        url: '/lists.json',
        type: 'GET',
        dataType: 'json',
        success: resp => {
          commit("UPDATE_LISTS", resp)
          console.log(resp)
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
});