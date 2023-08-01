import * as yup from "yup";

const useValidation = () =>
  yup
    .object()
    .shape({
      username: yup.string().required("Please enter a username"),
      email: yup.string().email("Please enter a valid email").notRequired(),
      age: yup
        .number()
        .typeError("Please insert a valid age")
        .min(18, "You must be at least 18 to register")
        .notRequired(),
      password: yup
        .string()
        .min(6, "Password must be between 6 and 12 characters long")
        .max(12, "Password must be between 6 and 12 characters long")
        .notRequired(),
    })
    .required();

export default useValidation;
