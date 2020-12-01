<template>
  <v-row class="justify-end">
    <v-dialog v-model="dialog">
      <v-card class="pa-3">
        <voting-settings
          :is-new="false"
          :voting="voting"
          :dialog.sync="dialog"
        ></voting-settings>
      </v-card>
    </v-dialog>
    <v-btn
      fab
      small
      class="mr-2"
      color="primary"
      :to="{ name: 'publicVoter', params: { id: voting.id } }"
    >
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>

    <v-btn disabled fab small class="mr-2" color="primary" v-if="voting.votes">
      <v-icon>mdi-vote</v-icon>{{ voting.votes.length }}
    </v-btn>
    <v-btn @click="dialog = true" fab small class="mr-2" color="primary"
      ><v-icon>mdi-cog</v-icon></v-btn
    >
    <v-btn color="primary" @click="deleteVoting()" class="mr-2" fab small
      ><v-icon> mdi-delete</v-icon></v-btn
    ></v-row
  >
</template>

<script>
import { mapActions } from "vuex";
import { DELETE_VOTING, GET_VOTINGS } from "../../../../../store/const/voting";
import requestControl from "@/mixins/requestControl"; /*@ checkRequestOnError*/
import votingSettings from "../votingSettings";
export default {
  components: {
    votingSettings
  },
  props: {
    voting: {
      type: Object,
      required: true
    }
  },
  mixins: [requestControl],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions("Votings", {
      deleteCurrentVoting: DELETE_VOTING,
      fetchVotings: GET_VOTINGS
    }),
    async deleteVoting() {
      await this.deleteCurrentVoting(this.voting);
      if (this.checkRequestOnError(DELETE_VOTING)) {
        this.$notify({
          type: "succ",
          text: "Voting succefully deleted"
        });
        this.fetchVotings();
      }
    }
  }
};
</script>

<style></style>
