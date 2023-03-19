<template>
  <div id="app">
    <nav>
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <transition name="fade">
      <ModalWindow
        v-if="ModalWindow"
        :ModalWindow="ModalWindow"
        :modalWindowSettings="modalWindowSettings"
      />
    </transition>
    <transition name="fade">
      <ModalMenu />
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    ModalWindow: () => import("./components/ModalWindow"),
    ModalMenu: () => import("./components/ModalMenu"),
  },
  data() {
    return {
      ModalWindow: "",
      modalWindowSettings: {},
    };
  },
  methods: {
    onShowModal(settings) {
      this.ModalWindow = settings.name;
      this.modalWindowSettings = settings;
    },
    onHideModal() {
      this.ModalWindow = "";
      this.modalWindowSettings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("showModal", this.onShowModal);
    this.$modal.EventBus.$on("hideModal", this.onHideModal);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("showModal", this.onShowModal);
    this.$modal.EventBus.$off("hideModal", this.onHideModal);
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
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
