<template>
  <div>
    <h1>Ошибка 404</h1>
    <h3>Страница не найдена!</h3>
    <AddButton @click="$modal.show('AuthForm', { title: 'Авторизация' })"
      >Авторизоваться</AddButton
    >
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue";
export default {
  name: "NotFound",
  components: { AddButton },
};
</script>

<style scoped>
</style>