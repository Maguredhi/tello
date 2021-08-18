<template>
  <div class="list">
    <header>
      <h2 class="header">{{ list.name }}</h2>
      <a href="#" @click="deleteList">
        <i class="far fa-trash-alt"></i>
      </a>
    </header>
    <div class="deck">
      <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
        <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>

      <div class="input-area">
        <button class="btn bg-gray-400" v-if="!editing" @click="newCard">New Card</button>

        <textarea class="content" v-if="editing" v-model="content"></textarea>
        <button class="btn bg-green-400" v-if="editing" @click="createCard">Create</button>
        <button class="btn bg-gray-400" v-if="editing" @click="editing = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from '@rails/ujs';
import Card from 'components/card';
import draggable from 'vuedraggable';

export default {
  name: 'List',
  props: ["list"],
  components: { Card, draggable },
  data: function () {
    return {
      content: '',
      cards: this.list.cards,
      editing: false
    }
  },
  methods:{
    deleteList(event) {
      event.preventDefault();
      if (confirm('Are You Sure?')) {
        this.$store.dispatch("removeList", this.list.id);
      }
    },
    cardMoved(event) {
      let evt = event.added || event.moved;
      if (evt) {
        let el = evt.element;
        let card_id = el.id;

        let data = new FormData();
        data.append("card[list_id]", this.list.id);
        data.append("card[position]", evt.newIndex + 1);

        Rails.ajax({
          // /cards/2/move
          url: `/cards/${card_id}/move`,
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
      console.log(event)
    },

    newCard(event) {
      event.preventDefault();
      this.editing = true;
    },

    createCard(event) {
      event.preventDefault();
      console.log(this.content);

      let data = new FormData();
      data.append("card[list_id]", this.list.id);
      data.append("card[name]", this.content);

      Rails.ajax({
        url: '/cards',
        type: 'POST',
        data,
        dataType: 'json',
        success: resp => {
          console.log(resp);
          this.cards.push(resp);
          this.content = "";
          this.editing = false;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.ghost {
  @apply border-2 border-gray-400 border-dashed bg-gray-200;
}

.list {
  // 預設 flex 會自動展開，這裡 list 改成 flex-none
  @apply bg-gray-300 mx-2 w-64 rounded p-3 flex-none h-full;

  .header {
    @apply font-bold;
  }
  .deck {
    @apply mt-2;
  }
}

.input-area {
  @apply mt-2;

  .content {
    @apply w-full p-2 rounded-sm;

    &:focus {
      @apply outline-none;
    }
  }
  .btn {
    @apply px-3 py-2 font-semibold text-sm rounded;

    &:focus {
      @apply outline-none;
    }
  }
}
header {
  @apply flex justify-between items-center
}
</style>
