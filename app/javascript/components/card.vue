<template>
  <div>
    <div @click="editing = true" class="card">
      {{ card.name }}
    </div>

    <div v-if="editing" class="dialog">
      <div class="inner">
        <a href="#" @click="close" class="close-btn">
          <i class="fas fa-times"></i>
        </a>
        <textarea class="content" v-model="cardName"></textarea>
        <button class="update-btn" @click="update">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'; 已改用 dispatch 方法

export default {
  name: 'Card',
  data: function() {
    return {
      cardName: this.card.name,
      editing: false
    }
  },
  props: ["card"],
  methods: {
    // ...mapActions(["updateCard"])
    close(event) {
      event.preventDefault();
      this.editing = false;
    },

    update(event) {
      event.preventDefault();
      this.$store.dispatch("updateCard", { id: this.card.id, name: this.cardName });
      this.editing = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply bg-gray-100 mb-2 rounded-sm px-2 py-2 cursor-pointer;
}

.dialog {
  // modal
  background-color: rgba(0, 0, 0, 0.7);
  @apply fixed w-full h-full top-0 left-0 flex items-center justify-center;

  .inner {
    width: 700px;
    @apply bg-white flex flex-col px-6 py-2;

    .close-btn {
      @apply text-gray-800 text-right;
    }

    .content {
      @apply p-2 border border-gray-300 mt-2;

      &:focus {
        @apply outline-none;
      }
    }
    .update-btn {
      @apply bg-gray-400 px-3 py-2 mt-2 rounded;

      &:focus {
        @apply outline-none;
      }
    }
  }
}
</style>
