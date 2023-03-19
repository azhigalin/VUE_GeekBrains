<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="display">
      <input type="text" v-model.number="operand1" />
      {{ operation }}
      <input type="text" v-model.number="operand2" />
      =
      {{ result }}
    </div>
    <div class="operations">
      <button
        v-for="operator in operators"
        :key="operator"
        :title="operator"
        @click="setOperation(operator)"
      >
        {{ operator }}
      </button>
      <div class="keyboard">
        Показать клавиатуру
        <input type="checkbox" v-model="show" @click="show = !show" />
        <br />
        <button
          v-for="key in keys"
          v-show="show"
          :key="key"
          :title="key"
          @click="inputNum(key)"
        >
          {{ key }}
        </button>
        <button v-show="show" @click="deleteNum()">&larr;</button>
      </div>
    </div>
    <div class="radio">
      <input type="radio" id="one" v-model="picked" value="operand1" />
      <label for="one">Операнд 1 </label>
      <input type="radio" id="two" v-model="picked" value="operand2" />
      <label for="two">Операнд 2</label>
    </div>
    <div class="error" v-if="error">Ошибка! {{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operand1: "",
      operand2: "",
      operation: "+",
      operators: ["+", "-", "*", "/", "**", "//"],
      error: "",
      keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      show: false,
      picked: "operand1",
    };
  },
  computed: {
    result() {
      this.error = "";
      switch (this.operation) {
        case "+":
          return +this.operand1 + +this.operand2;
        case "-":
          return +this.operand1 - +this.operand2;
        case "*":
          return +this.operand1 * +this.operand2;
        case "/":
          const { operand1, operand2 } = this;
          if (operand2 === 0) {
            this.error = "Делить на 0 нельзя!";
          } else {
            return +operand1 / +operand2;
          }
        case "**":
          return Number(this.operand1) ** +this.operand2;
        case "//":
          return Math.floor(+this.operand1 / +this.operand2);
        default:
          return 0;
      }
    },
  },
  methods: {
    setOperation(operation) {
      this.operation = operation;
    },
    inputNum(elem) {
      if (this.picked === "operand1") {
        this.operand1 += String(elem);
      } else {
        this.operand2 += String(elem);
      }
    },
    deleteNum() {
      if (this.picked === "operand1") {
        this.operand1 = this.operand1.slice(0, -1);
      } else {
        this.operand2 = this.operand2.slice(0, -1);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  border: 1px solid rgb(77, 26, 26);
  background-color: rgb(239, 15, 15);
  text-align: center;
  padding: 10px;
  margin: 10px;
}
.operations {
  margin: 10px;
}

button {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 4px;
  color: #555555;
  width: 30px;
  margin: 2px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 4px 6px;
  text-decoration: none;
}
button:hover,
button:focus {
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(82, 168, 236, 0.6);
  outline: 0 none;
}

.keyboard {
  margin-top: 20px;
}
</style>
