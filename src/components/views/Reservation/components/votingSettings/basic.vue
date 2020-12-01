<template>
  <v-list three-line subheader>
    <v-subheader>Title & Description of your voting</v-subheader>
    <v-list-item>
      <v-list-item-content class="pa-2">
        <v-text-field
          label="Title of voting "
          :rules="rule.required"
          :value="title"
          @input="$emit('update:title', $event)"
        >
        </v-text-field>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content class="pa-2">
        <v-textarea
          label="Description"
          :rules="rule.required"
          type="textarea"
          :value="description"
          @input="$emit('update:description', $event)"
        >
        </v-textarea>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content class="pa-2 pl-1">
        <button-settings
          v-for="(option, index) in options"
          :key="index"
          v-bind.sync="options[index]"
        >
          <span>BUTTON №{{ index + 1 }}</span>
          <v-btn
            @click="spliceButton()"
            color="primary"
            class="float-right"
            :disabled="options.length == 1"
            fab
            small
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </button-settings>
        <v-btn @click="appendButton()">Add voting button</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import validationRules from "@/mixins/validationRules";
import buttonSettings from "./buttonSettings";
export default {
  components: {
    buttonSettings
  },
  mixins: [validationRules],
  props: {
    options: {
      type: Array,
      required: true
    },
    date: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  methods: {
    spliceButton(index) {
      let cloneArr = [].concat(this.options);
      cloneArr.splice(index, 1);
      this.$emit("update:options", cloneArr);
    },
    appendButton() {
      let cloneArr = [].concat(this.options);
      cloneArr.push({ color: "", text: "type text", dark: true });
      this.$emit("update:options", cloneArr);
    }
  }
};
</script>

<style></style>
