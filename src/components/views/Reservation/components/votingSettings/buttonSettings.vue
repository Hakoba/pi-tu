<template>
  <v-expand-transition>
    <v-card class="pa-3 my-2 ml-0">
      <v-row>
        <v-col cols="12">
          <slot></slot>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-color-picker
            dot-size="25"
            swatches-max-height="200"
            :value="color"
            @input="$emit('update:color', $event)"
          ></v-color-picker>
        </v-col>
        <v-col cols="12" md="9">
          <v-switch
            :value="dark"
            @change="$emit('update:dark', $event === true ? true : false)"
            label="white text"
            hide-details
          ></v-switch>
          <v-text-field
            :value="text"
            label="Type button text"
            @input="$emit('update:text', $event)"
          ></v-text-field>
          <v-card class="ma-2 pa-2 text-center">
            <v-btn :dark="dark" :color="color">{{ text }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-expand-transition>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    dark: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style></style>
