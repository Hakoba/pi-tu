<template>
  <v-form ref="form">
    <v-stepper v-model="step" class="elevation-1" vertical>
      <v-stepper-step step="1" @click="step = 1" complete>
        Basic settings
      </v-stepper-step>

      <v-stepper-content step="1">
        <basic-settings v-bind.sync="form"></basic-settings>
      </v-stepper-content>

      <v-stepper-step step="2" @click="step = 2" complete>
        Access settings
      </v-stepper-step>

      <v-stepper-content step="2">
        <extened-settings v-bind.sync="form.accessSettings"></extened-settings>
      </v-stepper-content>
      <v-stepper-step step="3" @click="step = 3" complete>
        Limit settings
      </v-stepper-step>

      <v-stepper-content step="3">
        <limit-settings v-bind.sync="form.limits"></limit-settings>
      </v-stepper-content>
    </v-stepper>
    <v-row>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn color="primary" v-if="step < 3" @click="step++">
          Continue
        </v-btn>
        <v-btn color="primary" v-else-if="isNew" @click="createVoting">
          Create
        </v-btn>
        <v-btn color="primary" v-else @click="updateVoting">
          Update
        </v-btn>
        <v-btn @click="step--" v-if="step != 1" :disabled="step === 1" text>
          Cancel
        </v-btn>
        <v-btn @click="$emit('update:dialog', false)" v-else text>
          Close
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import basicSettings from "./basic";
import extenedSettings from "./extended";
import limitSettings from "./limits";
import requestControl from "@/mixins/requestControl"; /*@ checkRequestOnError*/
import {
  CREATE_VOTING,
  GET_VOTINGS,
  UPDATE_VOTING
} from "../../../../../store/const/voting";
export default {
  components: {
    basicSettings,
    limitSettings,
    extenedSettings
  },
  mixins: [requestControl],
  props: {
    isNew: {
      type: Boolean,
      required: false,
      default: false
    },
    dialog: {
      type: Boolean,
      required: false,
      default: false
    },
    voting: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        id: "",
        date: [],
        title: "",
        description: "",
        pictureSrc: "",
        info: "",
        votes: "",
        options: [],
        accessSettings: {
          onlyAuth: false,
          isPrivate: false,
          lgbt: false,
          country: false,
          password: ""
        },
        limits: {
          unique: 0,
          all: 0
        }
      },
      notifications: false,
      sound: true,
      widgets: false,
      step: 1
    };
  },
  watch: {
    voting(newVal) {
      this.form = JSON.parse(JSON.stringify(newVal));
    }
  },
  created() {
    if (Object.keys(this.voting) != 0) {
      this.form = Object.assign(this.voting);
    }
  },

  methods: {
    ...mapActions("Votings", {
      createNewVoting: CREATE_VOTING,
      updateCurrentVoting: UPDATE_VOTING,
      fetchVotings: GET_VOTINGS
    }),
    async createVoting() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        await this.createNewVoting(this.form);
        if (this.checkRequestOnError(CREATE_VOTING)) {
          this.$notify({
            type: "succ",
            text: "Voting succefully created"
          });
          await this.fetchVotings();
          console.log("lol");
          this.$emit("update:dialog", false);
        }
      }
    },
    async updateVoting() {
      this.$notify({
        type: "succ",
        text: "Not working yet :("
      });
      const isValid = this.$refs.form.validate();
      if (isValid) {
        await this.updateCurrentVoting({ id: this.form?.id, data: this.form });
        if (this.checkRequestOnError(CREATE_VOTING)) {
          this.$notify({
            type: "succ",
            text: "Voting succefully updated"
          });
          await this.fetchVotings();
          console.log("lol");
          this.$emit("update:dialog", false);
        }
      }
    }
  }
};
</script>

<style></style>
