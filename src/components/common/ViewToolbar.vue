<template>
  <v-row class=" mb-2 align-center" flat>
    <v-col v-if="title" height cols="12" sm="4" class="text-h6">
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="heading"
        width="100%"
      >
        <span>{{ title }}</span>
      </v-skeleton-loader>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" :sm="title ? 8 : 12">
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="button text"
        width="100%"
      >
        <v-row>
          <v-col
            cols="12"
            :sm="value != undefined ? 8 : 12"
            class="d-flex"
            :class="{
              'justify-end': title ? true : false,
              'justify-space-between': title ? false : true
            }"
          >
            <slot name="buttons"></slot>
          </v-col>
          <v-col v-if="value != undefined" cols="12" sm="4">
            <v-text-field
              full-width
              label="Search..."
              hide-details
              outlined
              color="primary"
              dense
              v-model="search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      // v-model === search
      type: String,
      required: false,
      default: undefined
    },
    title: {
      type: String,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    search: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  }
};
</script>
