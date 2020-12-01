import { createServer, Model, Response } from "miragejs";
import { getRandomInt } from "@/plugins/helpers";
export function makeServer({ environment = "development" }) {
  return createServer({
    environment,
    models: {
      voting: Model,
      user: Model
    },
    seeds(server) {
      // server.create("agency", {
      //   id: "1",
      //   name: "Тестовое агентство",
      //   description: null,
      //   time_zone: 3
      // });
      server.create("voting", {
        id: "2",
        date: ["2021-01-04", "2021-04-24"],
        title: "ZA WARUDO",
        description: "".padStart(200, "MUDA "),
        pictureSrc: "https://www.myinstants.com/media/instants_images/dio.PNG",
        info: "KONO DIO DA",
        votes: [
          { timestamp: 1611694525105, index: 0, id: "1231232fs13" },
          { timestamp: 1611694425105, index: 0, id: "1231eq23213" },
          { timestamp: 1611694455105, index: 1, id: "12eq3123213" }
        ],
        options: [
          {
            color: "#e3232e",
            text: "Wryy",
            dark: true
          },
          {
            color: "#e2a242",
            dark: true,
            text: "Yare yare daze"
          }
        ],
        accessSettings: {
          onlyAuth: false,
          isPrivate: false,
          lgbt: false,
          country: false,
          password: ""
        },
        limits: {
          unique: 0,
          all: 0
        }
      });
      server.create("voting", {
        id: "3",
        date: ["2021-01-04", "2021-04-24"],
        title: "KROVOSTOK",
        description: `Never gonna give you up
        Never gonna let you down
        Never gonna run around and desert you
        Never gonna make you cry
        Never gonna say goodbye
        Never gonna tell a lie and hurt you`,
        pictureSrc: "https://www.myinstants.com/media/instants_images/dio.PNG",
        info: "DUMAI POSITIVNO",
        votes: [
          { timestamp: 1611694525105, index: 0, id: "1231232fs13" },
          { timestamp: 1611694555105, index: 0, id: "1231232fdd3" },
          { timestamp: 1611694425105, index: 0, id: "1231eq23213" },
          { timestamp: 1611694455105, index: 1, id: "12eq3123213" }
        ],
        options: [
          {
            color: "#e3232e",
            text: "Wryy",
            dark: true
          },
          {
            color: "#e2a242",
            dark: true,
            text: "Yare yare daze"
          }
        ],
        accessSettings: {
          onlyAuth: false,
          isPrivate: false,
          lgbt: false,
          country: false,
          password: ""
        },
        limits: {
          unique: 0,
          all: 0
        }
      });
      // server.create("voting", {
      //   id: "4",
      //   date: ["2021-01-04", "2021-04-24"],
      //   title: "TEasdST",
      //   description: `And if you ask me how I'm feeling
      //   Don't tell me you're too blind to see`,
      //   pictureSrc: "https://www.myinstants.com/media/instants_images/dio.PNG",
      //   info: "KURTEC",
      //   votes: ["2312", "23423423", "32423424"],
      //   accessSettings: {
      //     onlyAuth: false,
      //     isPrivate: false,
      //     lgbt: false,
      //     country: false,
      //     password: "",
      //   },
      //   limits: {
      //     unique: 0,
      //     all: 0,
      //   },
      // });

      server.create("user", {
        id: "1",
        is_active: true,
        email: "admin@admin.admin",
        password: "admin",
        first_name: "JOTARO",
        second_name: "Kujo",
        name: "JOTARO Kujo",
        role: "admin"
      });
    },
    routes() {
      this.namespace = "api";

      // Auth
      this.post("/login", (schema, request) => {
        const requestData = JSON.parse(request.requestBody);
        const password = requestData.password;
        const email = requestData.email;
        const user = schema.db.users.findBy({ email, password });
        console.log("api User", user);
        if (user) {
          return {
            code: 200,
            data: {
              access_token: "access_token1",
              expires_in: 100500
            }
          };
        } else {
          return new Response(
            401,
            {},
            {
              code: 401,
              data: {
                message: "Incorrect Login or password, sorry("
              }
            }
          );
        }
      });

      this.post("/votings", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        let isValidate = body.title && body.description;
        if (isValidate) {
          const voting = schema.create("voting", {
            ...body,
            info: "KROVOSTOK",

            id: getRandomInt(10000000),

            pictureSrc:
              "https://www.myinstants.com/media/instants_images/dio.PNG"
          });
          return {
            code: 200,
            data: voting.id,
            error: null
          };
        } else {
          return new Response(
            400,
            {},
            {
              code: 400,
              data: { message: "Заполнены не все обязательные поля" },
              error: "Заполнены не все обязательные поля"
            }
          );
        }
      });
      this.get("/votings/:id", (schema, request) => {
        const voting = schema.db.votings.find(request.params.id);
        if (voting) {
          return {
            code: 200,
            data: voting,
            error: null
          };
        } else {
          return new Response(
            400,
            {},
            {
              code: 400,
              data: null,
              error: "Voting not found"
            }
          );
        }
      });
      this.patch("/updates/:id", (schema, request) => {
        const voting = schema.db.votings.find(request.params.id);
        if (voting) {
          schema.db.votings.update(request.params.id, request.body);
          return {
            code: 200,
            data: { status: true },
            error: null
          };
        } else {
          return new Response(
            400,
            {},
            {
              code: 400,
              data: null,
              error: "Voting not found"
            }
          );
        }
      });
      this.delete("/votings/:id", (schema, request) => {
        const voting = schema.db.votings.find(request.params.id);
        schema.db.votings.remove(request.params.id);
        if (voting) {
          return {
            code: 200,
            data: { status: true },
            error: null
          };
        } else {
          return new Response(
            400,
            {},
            {
              code: 400,
              data: null,
              error: "Voting not found"
            }
          );
        }
      });
      this.get("/votings", schema => {
        const votings = schema.votings.all();

        console.log("aaaaa", schema.db);
        if (votings) {
          return {
            code: 200,
            data: votings.models,
            error: null
          };
        } else {
          return new Response(
            400,
            {},
            {
              code: 400,
              data: { message: "sry" }
              // error: "Sorry lol"
            }
          );
        }
      });

      this.post("/me", schema => {
        let user = true;
        if (user) {
          return {
            code: 200,
            data: {
              ...schema.db.users[0]
            }
          };
        } else {
          return new Response(
            401,
            {},
            {
              code: 401,
              data: {
                message: "Session was Сдохла"
              }
            }
          );
        }
      });
    }
  });
}
