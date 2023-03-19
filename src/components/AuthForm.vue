<template>
  <div>
    <input type="text" />
    <input type="text" />
    <AddButton type="button">Войти</AddButton>
  </div>
</template>

<script>
import AddButton from "@/components/AddButton";
export default {
  name: "AuthForm",
  components: { AddButton },
};
</script>

<style scoped>
</style>