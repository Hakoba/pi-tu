<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Create new Voting
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>New voting form</v-toolbar-title>
      </v-toolbar>
      <voting-settings :dialog.sync="dialog" :is-new="true"> </voting-settings>
    </v-card>
  </v-dialog>
</template>

<script>
import votingSettings from "./components/votingSettings/index";
export default {
  components: {
    votingSettings
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
