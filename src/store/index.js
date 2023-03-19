import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    costsList: [],
    categoryList: [],
  },
  getters: {
    getCostsList: (state) => state.costsList,
    getFullCostsValue: (state) => {
      return state.costsList.reduce((res, cur) => res + cur.value, 0);
    },
    getCategoryList: (state) => state.categoryList,
  },
  mutations: {
    setCostListData(state, payload) {
      state.costsList = payload;
    },
    addDataToCostsList(state, payload) {
      state.costsList.push(payload);
    },
    setCategories(state, payload) {
      if (!Array.isArray(payload)) {
        payload = [payload];
      }
      state.categoryList = [];
      state.categoryList.push(...payload);
    },
    editDataToCostsList(state, payload) {
      state.costsList.forEach((el) => {
        if (el.id === payload.id) {
          el.value = payload.value;
          el.category = payload.category;
          el.date = payload.date;
        }
      });
    },
    deleteDataToCostsList(state, payload) {
      state.costsList = state.costsList.filter((item) => item.id !== payload);
    },
  },
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, date: "12.02.2023", category: "Food", value: 1582 },
            { id: 2, date: "15.02.2023", category: "Transport", value: 350 },
            { id: 3, date: "16.02.2023", category: "Rest", value: 56000 },
          ]);
        }, 1000);
      }).then((res) => {
        if (!this.state.costsList.length) {
          commit("setCostListData", res);
        }
      });
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            "Food",
            "Sport",
            "Transport",
            "Education",
            "Rest",
            "Entertainment",
          ]);
        }, 1000);
      }).then((res) => {
        commit("setCategories", res);
      });
    },
  },
  modules: {},
});
