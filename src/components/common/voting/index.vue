<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="voting.pictureSrc" height="200px"></v-img>

    <v-card-title>
      {{ voting.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ voting.info }}
      <voting-buttons :options="voting.options"></voting-buttons>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" @click="show = true" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ voting.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import votingButtons from "./Buttons";
export default {
  name: "votingCard",
  components: {
    votingButtons
  },
  props: {
    voting: {
      type: Object,
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
