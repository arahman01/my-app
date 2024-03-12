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
import { CiRedo } from "react-icons/ci";

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordProps, setPasswordProps] =
    useState<PasswordProps>(initialValues);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const newPassword = generatePassword2(initialValues);
    setGeneratedPassword(newPassword);
  }, []);

  const handleGenerateClick = () => {
    const newPassword = generatePassword2(passwordProps);
    setGeneratedPassword(newPassword);
  };

  const copyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
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
          title=""
          aria-label="Copy"
          data-tooltip="Copy"
          onClick={copyPassword}
        >
          <MdContentCopy />
        </button>
      </div>
      <div className={`${styles.modal} ${showModal ? styles.show : ""}`}>
        <div className={styles.modalContent}>Password Copied</div>
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
              className={styles.rangeStyles}
            />
          </div>
          <div className={styles.option}>
            <label>Uppercase</label>
            <input
              type="checkbox"
              name="includeUpperCase"
              checked={passwordProps.includeUpperCase}
              onChange={handleChange}
              className={styles.checkboxStyles}
            />
          </div>
          <div className={styles.option}>
            <label>Lowercase</label>
            <input
              type="checkbox"
              name="includeLowerCase"
              checked={passwordProps.includeLowerCase}
              onChange={handleChange}
              className={styles.checkboxStyles}
            />
          </div>
          <div className={styles.option}>
            <label>Numbers</label>
            <input
              type="checkbox"
              name="includeNumber"
              checked={passwordProps.includeNumber}
              onChange={handleChange}
              className={styles.checkboxStyles}
            />
          </div>
          <div className={styles.option}>
            <label>Symbols</label>
            <input
              type="checkbox"
              name="includeSymbols"
              checked={passwordProps.includeSymbols}
              onChange={handleChange}
              className={styles.checkboxStyles}
            />
          </div>
        </div>

        <div className={styles.centerButton}>
          <button
            type="button"
            title=""
            aria-label="Regenerate"
            data-tooltip="Regenerate"
            className={styles.btn}
            onClick={handleGenerateClick}
          >
            <CiRedo />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordGenerator;
