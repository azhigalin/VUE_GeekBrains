<template>
  <div class="paymentList">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Цена, ₽</th>
        </tr>
      </thead>
      <tbody>
        <tr class="paymentItem" v-for="(item, index) in list" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.value }}</td>
          <button type="button" @click="onClickModalMenu($event, item)">
            ...
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AppList",
  props: {
    list: Array,
  },
  methods: {
    editItem(item) {
      this.$modal.showModal("AppForm", {
        title: "Изменить платёж",
        props: { item },
      });
      this.$modalMenu.closeMenu();
    },
    deleteItem(item) {
      this.$store.commit("deleteDataToCostsList", item);
      this.$modalMenu.closeMenu();
      console.log("del", item);
    },
    onClickModalMenu(event, item) {
      const items = [
        {
          text: "Edit",
          action: () => {
            this.editItem(item);
          },
        },
        {
          text: "Delete",
          action: () => {
            this.deleteItem(item.id);
          },
        },
      ];
      this.$modalMenu.openMenu({ event, items });
    },
  },
};
</script>

<style module lang="scss">
table {
  width: 90%;
  font-size: 20px;
  margin: 0 auto;
}
th {
  padding: 5px;
  border-bottom: 1px solid mediumaquamarine;
  &:not(:last-child) {
    border-right: 1px solid mediumaquamarine;
  }
}
td {
  padding: 5px;
  &:not(:last-child) {
    border-right: 1px solid mediumaquamarine;
  }
}
</style>