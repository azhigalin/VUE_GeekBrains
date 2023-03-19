<template>
  <div class="pagination">
    <ul>
      <li @click="onClickNumber(listCurrent - 1)">&lt;</li>
      <li v-for="n in numbersPagination" :key="n" @click="onClickNumber(n)">
        {{ n }}
      </li>
      <li @click="onClickNumber(listCurrent + 1)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    listLength: Number,
    n: Number,
    listCurrent: Number,
  },
  methods: {
    onClickNumber(p) {
      if (p < 1 || p > this.numbersPagination) {
        return;
      }
      this.$emit("changePage", p);
    },
  },
  computed: {
    numbersPagination() {
      return Math.ceil(this.listLength / this.n);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  width: 100%;
}

ul {
  display: flex;
  justify-content: center;
}

li {
  list-style-type: none;
  margin: 3px 10px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: crimson;
  }
}
</style>