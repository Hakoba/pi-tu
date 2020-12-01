<template>
  <v-container class="fill-height" fluid="">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card class="elevation-1" max-width="506px">
          <v-card-title>
            <v-img
              class="ma-3"
              src="@/assets/logo/vector/default-monochrome-black.svg"
            ></v-img>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                data-cy="email"
                lazy-validation
                outlined
                label="Email"
                :rules="rule.email"
                v-model="form.email"
                type="text"
              ></v-text-field>
              <v-text-field
                outlined
                data-cy="password"
                label="Password"
                v-model="form.password"
                @keypress.enter="enterToAccount"
                :rules="rule.password"
                name="password"
                :type="viewPass ? 'text' : 'password'"
                :append-icon="viewPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="viewPass = !viewPass"
                hide-details="auto"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="px-4">
            <v-row>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  large="large"
                  block
                  :loading="isLoginLoading"
                  @click="enterToAccount"
                  :disabled="!valid"
                  data-cy="login"
                  >Login</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import dbg from "@/plugins/dbg";
import validation from "@/mixins/validationRules";
import requestControl from "@/mixins/requestControl";
import { AUTH_LOGIN } from "../../../store/const/auth";
import { mapActions } from "vuex";
export default {
  mixins: [validation, requestControl],
  data() {
    return {
      form: {
        email: "admin@admin.admin",
        password: "admin"
      },
      serverErrors: {
        email: "",
        password: ""
      },
      viewPass: false,
      valid: true,
      isBlockButton: window.innerWidth >= 600,
      lazy: true,
      enterButtonLoading: false
    };
  },
  computed: {
    isLoginLoading() {
      return this.loading(AUTH_LOGIN) === "loading";
    }
  },
  methods: {
    ...mapActions("Auth", {
      login: AUTH_LOGIN
    }),
    async enterToAccount() {
      const loginForm = this.$refs.form;
      const isValid = loginForm.validate();
      if (isValid) {
        await this.login(this.form);
        if (this.checkRequestOnError(AUTH_LOGIN)) {
          this.$notify({
            type: "succ",
            text: "Welcome"
          });
          this.$router.push({ name: "reservation" });
        }
      } else {
        dbg("1error", loginForm);
      }
    }
  }
};
</script>
