<template>
  <div class="home container">
    <header>
      <div class="title">Мои личные расходы</div>
      <div class="total">Всего: {{ getFullCostsValue }}</div>
    </header>
    <main>
      <div class="router">
        <router-link
          :to="{
            name: 'AppForm',
            params: { section: 'payment', category: 'Sport' },
            query: { value: 500 },
          }"
          >Sport 500</router-link
        >
        <br />
        <router-link
          :to="{
            name: 'AppForm',
            params: { section: 'payment', category: 'Transport' },
            query: { value: 50 },
          }"
          >Transport 50</router-link
        >
        <br />
        <router-link
          :to="{
            name: 'AppForm',
            params: { section: 'payment', category: 'Entertainment' },
            query: { value: 2000 },
          }"
          >Entertainment 2000</router-link
        >
      </div>
      <AddButton
        @click="$modal.showModal('AppForm', { title: 'Добавить новый платёж' })"
        >Добавить новую запись +</AddButton
      >
      <AppList :list="currentElements" />
      <AppPagination
        :listCurrent="listCurrent"
        :listLength="getCostsList.length"
        :n="n"
        @changePage="changePage"
      />
    </main>
  </div>
</template>

<script>
import AppList from "@/components/AppList.vue";
import AddButton from "@/components/AddButton";
import AppPagination from "@/components/AppPagination";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "DashboardView",
  components: {
    AddButton,
    AppList,
    AppPagination,
  },
  data() {
    return {
      listCurrent: 1,
      n: 5,
    };
  },
  methods: {
    ...mapMutations(["setCostListData"]),
    emitAction() {
      this.addBtnIsShown = false;
    },
    changePage(p) {
      this.listCurrent = p;
    },
  },
  async created() {
    await this.$store.dispatch("fetchData");
  },
  computed: {
    ...mapGetters(["getCostsList", "getFullCostsValue"]),
    currentElements() {
      return this.getCostsList.slice(
        this.n * (this.listCurrent - 1),
        this.n * (this.listCurrent - 1) + this.n
      );
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin: auto;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
}

.title {
  font-size: 32px;
  display: flex;
  justify-content: center;
  color: rgb(33, 126, 74);
}

.total {
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 32px;
}

.router {
  display: flex;
  flex-direction: column;
}
</style>
