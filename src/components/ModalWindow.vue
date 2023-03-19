<template>
  <div class="wrapper">
    <div class="header">{{ modalWindowSettings.title }}</div>
    <br />
    <div class="content">
      <component :is="ModalWindow" :values="modalWindowSettings.props" />
    </div>
    <div class="footer">
      <AddButton @click="$modal.hideModal()">Закрыть</AddButton>
    </div>
  </div>
</template>

<script>
import AppForm from "@/components/AppForm";
import AuthForm from "@/components/AuthForm";
import AddButton from "@/components/AddButton";

export default {
  name: "ModalWindow",
  components: { AddButton, AppForm, AuthForm },
  props: {
    ModalWindow: String,
    modalWindowSettings: Object,
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 70%;
  padding: 20px;
  top: 20%;
  position: absolute;
  left: 10%;
  background: white;
  border: 1px solid black;
  border-radius: 20px;
}
</style>