<template>
  <v-list three-line subheader>
    <v-subheader>Access for getting vote</v-subheader>
    <v-list-item>
      <v-list-item-action>
        <v-checkbox
          label="LGBT"
          :value="lgbt"
          @change="$emit('update:lgbt', $event === true ? true : false)"
        ></v-checkbox>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-action>
        <v-checkbox
          label="Access only for Autentificated users"
          :value="onlyAuth"
          @change="$emit('update:onlyAuth', $event === true ? true : false)"
        ></v-checkbox>
      </v-list-item-action>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-action>
          <v-checkbox
            label="With a password"
            :value="isPrivate"
            @change="$emit('update:isPrivate', $event === true ? true : false)"
          ></v-checkbox>
        </v-list-item-action>
        <v-text-field
          :value="password"
          :disabled="!isPrivate"
          @input="$emit('update:password', $event === true ? true : false)"
          label="Password"
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import validationRules from "@/mixins/validationRules";
export default {
  mixins: [validationRules],
  props: {
    onlyAuth: {
      type: Boolean,
      required: true
    },
    isPrivate: {
      type: Boolean,
      required: true
    },
    lgbt: {
      type: Boolean,
      required: true
    },
    country: {
      type: Boolean,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
