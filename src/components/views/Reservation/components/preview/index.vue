<template>
  <v-card>
    <v-card-title>
      <voting-card disabled class="blured-card" :voting="voting"></voting-card>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center">
          <h4>Title: {{ voting.title }}</h4>
        </v-col>
        <v-col>
          <voting-actions :voting="voting"></voting-actions>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import votingActions from "./actions";
import votingCard from "@/components/common/voting";

export default {
  components: {
    votingActions,
    votingCard
  },
  props: {
    voting: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
