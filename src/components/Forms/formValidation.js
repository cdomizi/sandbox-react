const formValidation = (props) => {
  const validateFields = (field) => {
    let rules = {};
    // Required
    if (field?.fieldFormat?.required)
      rules.required = "This field cannot be empty";
    // Type positive float
    if (field?.fieldFormat?.positiveFloat)
      rules = {
        ...rules,
        validate: {
          positiveFloat: (v) =>
            parseFloat(v) > 0 || v === "" || "Enter a valid price",
        },
      };
    return rules;
  };

  return validateFields(props);
};

export default formValidation;
