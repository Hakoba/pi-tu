<template>
  <v-main>
    <v-slide-x-transition>
      <router-view></router-view>
    </v-slide-x-transition>
  </v-main>
</template>
<script>
export default {
  data() {
    return {
      drawer: null
    };
  }
};
</script>
