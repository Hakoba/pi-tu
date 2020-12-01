export default {
  data() {
    return {
      rule: {
        email: [
          v => !!v || "Type Email address",
          v => /.+@.+\..+/.test(v) || "Email address is not valid"
        ],
        password: [
          v => !!v || "Password cannot be empty",
          v => v.length > 3 || "Password cannot be less than 4 characters"
        ],
        regularField: [
          v => v.length > 3 || "This field cannot be less than 4 characters"
        ],
        minZero: [v => v > 0 || "This value cannot be less then 0"],
        required: [v => !!v || v === 0 || "This field is required"]
      }
    };
  }
};
