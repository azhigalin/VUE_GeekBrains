<template>
  <v-app>
    <v-app-bar app flat>
      <v-icon size="48">mdi-calculator</v-icon>
      <v-btn plain :ripple="false" to="/dashboard">Дашборд</v-btn>
      <v-btn plain :ripple="false" to="/about">О приложении</v-btn>
      <v-btn class="red--text" plain :ripple="false" to="/404"
        >не нажимать!</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
