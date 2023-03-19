<template>
  <div class="modalMenu" v-if="shown" :style="styles">
    <div
      v-for="item in items"
      :key="item.text"
      class="modalMenu__item"
      @click="onClick(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalMenu",
  data() {
    return {
      shown: false,
      items: [],
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    onClick(item) {
      item.action();
    },
    onOpenMenu({ items, caller }) {
      this.items = items;
      this.shown = true;
      this.setPosition(caller);
    },
    onCloseMenu() {
      this.items = [];
      this.shown = false;
    },
    setPosition(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos + 30}px`,
        left: `${this.xPos + 20}px`,
      };
    },
  },
  mounted() {
    this.$modalMenu.EventBus.$on("openMenu", this.onOpenMenu);
    this.$modalMenu.EventBus.$on("closeMenu", this.onCloseMenu);
  },
  beforeDestroy() {
    this.$modalMenu.EventBus.$off("openMenu", this.onOpenMenu);
    this.$modalMenu.EventBus.$off("closeMenu", this.onCloseMenu);
  },
};
</script>

<style scoped lang="scss">
.modalMenu {
  padding: 20px;
  position: absolute;
  top: 20%;
  left: 10%;
  background: #75bb9c;
  border: 1px solid black;
  border-radius: 18px;

  &__item {
    padding: 5px;
    cursor: pointer;
    color: white;
  }
}
</style>