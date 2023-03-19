<template>
  <v-container class="home container">
    <v-row>
      <v-col>
        <header>
          <div class="text-h5 text-sm-h3 mb-8">Мои личные расходы</div>
          <div class="total mb-1">Всего: {{ getFullCostsValue }}</div>
        </header>
        <main>
          <v-dialog width="500">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="mb-4" color="teal" dark>
                Добавить расходы
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <AppForm titleText="Добавить" />
            </v-card>
          </v-dialog>

          <AppList :list="currentElements" />
          <v-pagination
            v-model="listCurrent"
            :length="Math.ceil(this.$store.getters.getCostsList.length / n)"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </main>
      </v-col>
      <v-col>
        <div class="text-h5 text-sm-h4 mt-8 text-center">Диаграмма</div>
        <MyDiagram />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppList from "@/components/AppList.vue";
import AppForm from "@/components/AppForm.vue";
import { mapMutations, mapGetters } from "vuex";
import MyDiagram from "@/components/MyDiagram";

export default {
  name: "DashboardView",
  components: {
    AppList,
    AppForm,
    MyDiagram,
  },
  data() {
    return {
      dialog: false,
      listCurrent: 1,
      n: 8,
    };
  },
  methods: {
    ...mapMutations(["setCostListData"]),
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
</style>
