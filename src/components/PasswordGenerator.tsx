import React, { useState, useEffect } from "react";
import {
  PasswordProps,
  initialValues,
  generatePassword2,
  minPasswordLength,
  maxPasswordLength,
} from "../utility/utility";
import styles from "./PasswordGenerator.module.css";
import { MdContentCopy } from "react-icons/md";

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordProps, setPasswordProps] =
    useState<PasswordProps>(initialValues);

  useEffect(() => {
    const newPassword = generatePassword2(initialValues);
    setGeneratedPassword(newPassword);
  }, []);

  const handleGenerateClick = () => {
    const newPassword = generatePassword2(passwordProps);
    setGeneratedPassword(newPassword);
  };

  const copyPassword = () => {
    return;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    let newValue: boolean | number | string =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    if (type === "range") {
      newValue = parseInt(value);
    }
    setPasswordProps((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    const newPassword = generatePassword2({
      ...passwordProps,
      [name]: newValue,
    });
    setGeneratedPassword(newPassword);
  };

  return (
    <div className={styles.container}>
      <h2>Password Generator</h2>
      <div className={styles.passwordField}>
        <span id="password">{generatedPassword}</span>
        <button
          className={styles.btn}
          id="clipboard"
          title="Copy"
          onClick={copyPassword}
        >
          <MdContentCopy />
        </button>
      </div>
      <form>
        <div className={styles.options}>
          <div className={styles.option}>
            <label>
              Length
              <span
                className={styles.passValue}
              >{`(${passwordProps.length})`}</span>
            </label>
            <input
              type="range"
              name="length"
              min={minPasswordLength}
              max={maxPasswordLength}
              value={passwordProps.length}
              onChange={handleChange}
            />
          </div>
          <div className={styles.option}>
            <label>Uppercase</label>
            <input
              type="checkbox"
              name="includeUpperCase"
              checked={passwordProps.includeUpperCase}
              onChange={handleChange}
            />
          </div>
          <div className={styles.option}>
            <label>Lowercase</label>
            <input
              type="checkbox"
              name="includeLowerCase"
              checked={passwordProps.includeLowerCase}
              onChange={handleChange}
            />
          </div>
          <div className={styles.option}>
            <label>Numbers</label>
            <input
              type="checkbox"
              name="includeNumber"
              checked={passwordProps.includeNumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles.option}>
            <label>Symbols</label>
            <input
              type="checkbox"
              name="includeSymbols"
              checked={passwordProps.includeSymbols}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.centerButton}>
          <button
            type="button"
            className={styles.btn}
            onClick={handleGenerateClick}
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
