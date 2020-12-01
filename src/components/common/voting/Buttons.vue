<template>
  <v-row>
    <v-col v-for="option in options" :key="option.text">
      <v-btn :dark="option.dark" :color="option.color">
        {{ option.text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style></style>
