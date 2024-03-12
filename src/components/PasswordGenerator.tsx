import React, { useState } from "react";
import {
  PasswordProps,
  initialValues,
  generatePassword,
  generatePassword2,
} from "../utility/utility";

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordProps, setPasswordProps] =
    useState<PasswordProps>(initialValues);

  console.log("generatePassword0", generatePassword(initialValues));
  console.log("generatePassword1", generatePassword2(initialValues));
  return <div>password generator</div>;
};

export default PasswordGenerator;
