<template>
  <v-container class="fill-height" fluid="">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-card class="elevation-1" max-width="436px">
          <v-card-text>
            <v-img
              class="mb-3"
              width="300px"
              src="@/assets/logo/vector/isolated-monochrome-black.svg"
            ></v-img>
            <p class="text-body-1">Ошибка 404: Страница не найдена</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :to="{ name: 'projects' }"
              color="error"
              data-cy="redirect"
              outlined="outlined"
            >
              Вернуться на главную</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
