import Vue from "vue";
import Vuetify from "vuetify/lib";
import ru from "vuetify/es5/locale/ru";
import en from "vuetify/es5/locale/en";
import VuetifyConfirm from "vuetify-confirm";

// import colors from "vuetify/lib/util/colors";
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(Vuetify);

// vuetify setting obj
const vuetify = new Vuetify({
  lang: {
    locales: { ru, en },
    current: "en"
  },
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        // primary: "#7676A7", // indigo
        primary: "#1D3557", // blueGray #435b71 // yellow #d9e021
        secondary: "#8DD01F", // sd
        info: "#2F2D2D", // dark
        accent: "#F2B5D4", //#01A299 // #C2185B
        error: "#861657",
        warning: "#E2C321",
        success: "#43DE79 "
      },
      dark: {
        primary: "#E5332A",
        secondary: "#B2F7EF",
        accent: "#F2B5D4",
        error: "#751010",
        info: "#730019",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Ок",
  buttonFalseText: "Отмена",
  color: "warning",
  icon: "mdi-alert",
  title: "Подтвердите действие",
  width: 350,
  property: "$confirm",
  persistent: true
});
export default vuetify;
