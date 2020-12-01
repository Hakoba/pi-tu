<template>
  <v-container
    class=" flex-nowrap flex-column"
    fluid="fluid"
    style="align-items: normal"
  >
    <view-toolbar title="Main" v-model="search">
      <template v-slot:buttons>
        <new-vote></new-vote>
        <about-popup></about-popup>
      </template>
    </view-toolbar>
    <v-fade-transition>
      <div>
        <v-row>
          <v-col
            :key="voting.id"
            v-for="voting in filteredVotings"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <preview-card :voting="voting"></preview-card>
          </v-col>
          <v-col v-if="!isLoading">
            <v-alert v-if="votings.length === 0" type="info"
              >no data yet :(</v-alert
            >
            <v-alert v-if="filteredVotings.length === 0" type="info"
              >not found :(</v-alert
            ></v-col
          >
        </v-row>
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import viewToolbar from "@/components/common/ViewToolbar";
import { debounce } from "../../../plugins/helpers";
import { GET_VOTINGS } from "../../../store/const/voting";
import previewCard from "./components/preview";
import newVote from "./new";
import requestControl from "@/mixins/requestControl"; /*@ checkRequestOnError*/
import aboutPopup from "@/components/common/AboutPopup";

export default {
  components: {
    viewToolbar,
    newVote,
    aboutPopup,
    previewCard
  },
  data() {
    return {
      search: ""
    };
  },
  mixins: [requestControl],
  watch: {
    // search(newVal) {
    //   if (newVal.length > 2) {
    //     this.debounceSearch(newVal);
    //     this.$router.replace({ query: { search: newVal } });
    //   } else {
    //     this.$router.replace({ query: {} });
    //   }
    // },
  },
  created() {
    this.fetchVotings();
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
  },
  computed: {
    isLoading() {
      return this.loading(GET_VOTINGS) === "loading";
    },
    ...mapGetters("Votings", {
      votings: "getVotings"
    }),
    filteredVotings() {
      return this.search.length != 0
        ? this.votings.filter(({ title }) => {
            return title?.toLowerCase().includes(this.search.toLowerCase());
          })
        : this.votings;
    }
  },
  methods: {
    ...mapActions("Votings", {
      fetchVotings: GET_VOTINGS
    }),
    debounceSearch: debounce(function(searchKey) {
      console.log("search... ", searchKey);
    }, 420)
  }
};
</script>
