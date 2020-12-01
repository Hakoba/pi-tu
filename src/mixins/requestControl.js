// ОБРАБОТКА ОШИБОК И ПОДТЯГИВАНИЕ ПРИЧИН ОШИБОК ОТ СЕРЕЕРА,
// ИНИЦИАЛИЗАЦИИИ РЕАКТИВНОГО Getter`а loading

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loading", "error"])
  },
  methods: {
    isError(name) {
      return this.loading(name) === "error";
    },
    errorMessage(name) {
      return this.error(name).error || this.error(name);
    },
    /**
     * Запрос вызывает снекбар с текстом ошибки либо возвращает инфу что все хорошо
     * @param requestName - константа из vuex
     * @returns {Boolean}
     */
    replacer(string) {
      string = string.replace(
        "The email has already been taken.",
        "Пользователь с таким e-mail уже зарегистрирован."
      );
      string = string.replace("Unauthorized", "Ошибка аутентификации");
      string = string.replace(
        "The name has already been taken.",
        "Такое название уже занято"
      );

      return string;
    },
    checkRequestOnError(requestName) {
      if (this.isError(requestName)) {
        this.$notify({
          type: "err",
          title: "Ошибка",
          // duration: 1999999,
          text: this.replacer(this.errorMessage(requestName))
        });
        return false;
      }
      return true;
    }
  }
};
