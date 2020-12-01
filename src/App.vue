<template>
  <v-app>
    <v-expand-transition>
      <router-view></router-view>
    </v-expand-transition>
    <notifications position="bottom right" />
  </v-app>
</template>

<script>
import dbg from "@/plugins/dbg";

export default {
  name: "App",
  data: () => ({
    //
  }),
  mounted() {
    dbg("Store: ", this);
  }
};
</script>
