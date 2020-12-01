<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" class="black--text ml-2" v-bind="attrs" v-on="on">
        About
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        О приложении
      </v-card-title>

      <v-card-text>
        <p>
          Эта штука на момент коммита 27.01 01.15, писалась за 13 часов
        </p>
        Обычная голосовалка, заходишь в кабинет, создаешь голосовалку,
        настраиваешь приватность, возможные варианты ответов, название и все
        такое.<br />
        На новую голосовалку создается ссылка, по которой может пройти любой
        пользователь или посетитель, в зависимости от настроек приватности
        <br />
        В любой момент настройки можно поменятть в своем кабинете<br />
        После того как пользователь заходит на страницу, его вход фиксируется,
        на него вешается id, и хранится в localStorage, если переход был сделан
        без регистрации(не сделано)
        <br />
        Далее пользователь делает выбор, его выбор фиксируется записывается
        время ивента, id пользователя, и отправляется на сервер, где потом по
        идее будут графики с полученными за голосовалку данными
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Ок
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
