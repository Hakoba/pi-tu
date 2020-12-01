<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <v-text-field
          outlined
          :dense="dense"
          :value="value"
          hide-details="auto"
          @input="changeDate($event)"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          readonly
          :disabled="disabled"
        ></v-text-field>
      </div>
    </template>
    <v-date-picker
      :disabled="disabled"
      :first-day-of-week="1"
      :value="value"
      @input="
        menu = false;
        changeDate($event);
      "
    ></v-date-picker>
  </v-menu>
</template>

<script>
import dbg from "@/plugins/dbg";

export default {
  props: {
    value: {
      type: [Date, String, Number],
      required: true
    },
    label: {
      type: String,
      required: false,
      default: "Дата"
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    changeDate(event) {
      dbg("Date", this.value);

      this.$emit("input", event);
    }
  }
};
</script>

<style></style>
