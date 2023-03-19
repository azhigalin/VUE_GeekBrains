<template>
  <div>
    <ejs-accumulationchart
      id="container"
      ref="pie"
      style="display: block"
      :theme="theme"
      :legendSettings="legendSettings"
      :tooltip="tooltip"
      :enableAnimation="enableAnimation"
      :enableSmartLabels="enableSmartLabels"
    >
      <e-accumulation-series-collection>
        <e-accumulation-series
          :dataSource="data"
          xName="x"
          yName="y"
          :radius="radius"
          innerRadius="25%"
          :dataLabel="dataLabel"
        ></e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </div>
</template>

<script>
import Vue from "vue";
import {
  AccumulationChartPlugin,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
} from "@syncfusion/ej2-vue-charts";
import { mapGetters } from "vuex";
Vue.use(AccumulationChartPlugin);
export default Vue.extend({
  data() {
    return {
      theme: "Dark",
      data: [{ x: "Preloader", y: 100, r: "70%" }],
      radius: "r",
      legendSettings: { visible: true },
      dataLabel: { visible: true, position: "Outside", name: "x" },
      tooltip: {
        enable: true,
      },
      enableAnimation: true,
      enableSmartLabels: true,
    };
  },
  provide: {
    accumulationchart: [
      AccumulationLegend,
      PieSeries,
      AccumulationDataLabel,
      AccumulationTooltip,
    ],
  },
  computed: {
    ...mapGetters(["getCostsList"]),
  },
  methods: {
    convertDBtoChart() {
      const categories = this.getCostsList.map((el) => el.category);
      const uniqueCategories = categories.filter(
        (val, idx, self) => self.indexOf(val) === idx
      );
      this.data = uniqueCategories.map((el) => {
        return {
          x: el,
          y: this.getCostsList
            .filter((item) => item.category === el)
            .reduce((acc, cur) => acc + cur.value, 0),
          r:
            100 -
            Math.ceil(
              (this.getCostsList
                .filter((item) => item.category === el)
                .reduce((acc, cur) => acc + cur.value, 0) *
                100) /
                this.getCostsList.reduce((acc, cur) => acc + cur.value, 0)
            ) +
            "%",
        };
      });
    },
  },
  created() {
    setTimeout(() => {
      this.convertDBtoChart();
    }, 2000);
  },
});
</script>

<style scoped>
/* // "dependencies": {
  //   "@syncfusion/ej2-vue-charts": "^19.1.67",
  //   "ress": "^5.0.2",
  //   "chart.js": "^4.2.1",
  //   "core-js": "^3.29.1",
  //   "vue": "^3.2.47",
  //   "vue-chartjs": "^5.2.0",
  //   "vue-router": "^4.1.6",
  //   "vuetify": "^3.1.10",
  //   "vuex": "^4.1.0"
  // },
  // "devDependencies": {
  //   "@babel/core": "^7.21.3",
  //   "@babel/eslint-parser": "^7.21.3",
  //   "@vue/cli-plugin-babel": "~5.0.8",
  //   "@vue/cli-plugin-eslint": "~5.0.8",
  //   "@vue/cli-plugin-router": "~5.0.8",
  //   "@vue/cli-plugin-vuex": "~5.0.8",
  //   "@vue/cli-service": "~5.0.8",
  //   "eslint": "^8.36.0",
  //   "eslint-plugin-vue": "^9.9.0",
  //   "sass": "^1.59.3",
  //   "sass-loader": "^13.2.1",
  //   "vue-cli-plugin-vuetify": "~2.5.8",
  //   "vue-template-compiler": "^2.7.14",
  //   "vuetify-loader": "^1.7.0"
  // } */
</style>