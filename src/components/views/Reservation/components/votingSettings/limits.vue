<template>
  <v-list three-line subheader>
    <v-subheader>Limit for this voting</v-subheader>
    <v-list-item>
      <v-list-item-content>
        <v-text-field
          label="All voters limit"
          type="number"
          :rules="rule.minZero"
          @input="$emit('update:all', parseInt($event))"
          :value="all"
        >
        </v-text-field>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-text-field
          label="Unique voters limit"
          type="number"
          :rules="rule.minZero"
          @input="$emit('update:unique', parseInt($event))"
          :value="unique"
        >
        </v-text-field>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import validationRules from "@/mixins/validationRules";

export default {
  mixins: [validationRules],
  props: {
    unique: {
      type: Number,
      required: true
    },
    all: {
      type: Number,
      required: true
    }
  }
};
</script>

<style></style>
