<template>
  <div class="container">
    <button v-if="!creatingList" @click="newList" class="new-btn">
      <i class="fas fa-plus"></i> 新增其它列表
    </button>
    <input v-if="creatingList" v-model="list_name" ref="list_name" type="text" class="list-name" placeholder="列表標題">
    <button v-if="creatingList" @click="createList" class="btn create-btn">建立</button>
    <button v-if="creatingList" @click="creatingList = false" class="btn cancel-btn">取消</button>
  </div>
</template>

<script>
export default {
  name: 'Newlist',
  data: function() {
    return {
      creatingList: false,
      list_name: ''
    }
  },
  methods: {
    newList(event) {
      event.preventDefault();
      this.creatingList = true;
      this.$nextTick(() => {
        this.$refs.list_name.focus();
      });
    },

    createList(event) {
      event.preventDefault();
      this.$store.dispatch("createList", this.list_name);
      this.creatingList = false;
      this.list_name = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-btn {
  @apply font-bold w-full text-left;

  &:focus {
    @apply outline-none;
  }
}

.list-name {
  @apply rounded w-full px-3 py-2 mb-2;

  &:focus {
    @apply outline-none;
  }
}

.btn {
  @apply px-3 py-1 rounded font-bold text-sm;

  &:focus {
    @apply outline-none;
  }
}

.create-btn {
  @apply bg-gray-400;
}

.cancel-btn {
  @apply bg-white;
}

.container {
  @apply bg-gray-300 px-3 py-2 mx-2 w-64 h-full rounded flex-none;
}
</style>
