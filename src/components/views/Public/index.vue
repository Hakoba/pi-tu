<template>
  <v-row class="fill-height align-center">
    <v-col>
      <voting :voting="getCurrentVoting"></voting>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { GET_VOTING } from "../../../store/const/voting";
import voting from "@/components/common/voting";
import { getRandomInt } from "@/plugins/helpers";

import requestControl from "@/mixins/requestControl"; /*@ checkRequestOnError*/

export default {
  components: {
    voting
  },
  mixins: [requestControl],
  async created() {
    let vId = localStorage.getItem("vId");
    if (!vId) {
      localStorage.setItem("vId", getRandomInt(199999999));
    }
    this.setTempUser({ data: { vId } });
    await this.getVoting();
  },
  computed: {
    ...mapGetters("Votings", ["getCurrentVoting"])
  },
  methods: {
    ...mapMutations("Users", ["setTempUser"]),
    ...mapActions("Votings", {
      fetchVoting: GET_VOTING
    }),
    async getVoting() {
      await this.fetchVoting({ id: this.$route.params.id });
    }
  }
};
</script>

<style></style>
