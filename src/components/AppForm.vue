<template>
  <div class="app-form">
    <input class="addFormInp" v-model="date" placeholder="date" />
    <select class="addFormInp" v-model="category" v-if="categoryList">
      <option value="">Выберите категорию</option>
      <option v-for="(option, idx) in categoryList" :key="idx">
        {{ option }}
      </option>
    </select>
    <input class="addFormInp" v-model.number="value" placeholder="value" />
    <AddButton class="add-btn__save" @click="onSave">ADD +</AddButton>
  </div>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  name: "AppForm",
  components: { AddButton },
  data() {
    return {
      editMode: false,
      date: "",
      category: "",
      value: "",
      id: "",
    };
  },
  props: {
    values: Object,
  },
  methods: {
    onSave() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id:
          this.id ||
          Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      };
      if (this.editMode) {
        this.$store.commit("editDataToCostsList", data);
        this.editMode = false;
      } else {
        this.$store.commit("addDataToCostsList", data);
      }
    },
  },
  async created() {
    await this.$store.dispatch("fetchCategoryList");
  },
  mounted() {
    if (this.values?.item) {
      const { category, date, value, id } = this.values.item;
      this.value = value;
      this.date = date;
      this.category = category;
      this.id = id;
      this.editMode = true;
      return;
    }
    const { category, section } = this.$route.params;
    if (!category || !section) return;
    this.category = category;
    const { value } = this.$route.query;
    if (!value) return;
    this.value = value;
    if (this.value && this.category) {
      this.onSave();
    }
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      return formatter.format(today);
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-form {
  left: 60vh;
  top: 20vh;
  background-color: white;
  border: 1px solid rgb(33, 126, 74);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.addFormInp {
  width: 100%;
  height: 25px;
  margin: 5px 0;
}

.add-btn__save {
  width: 100px;
  height: 48px;
  background-color: rgb(33, 126, 74);
  border-radius: 10px;
  color: white;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .app-form {
    left: 25vh;
  }
}
</style>
