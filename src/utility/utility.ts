// TYPES
export type PasswordProps = {
  length: number;
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeNumber: boolean;
  includeSymbols: boolean;
};

const initialValues: PasswordProps = {
  length: 10,
  includeLowerCase: true,
  includeUpperCase: true,
  includeNumber: true,
  includeSymbols: true,
};
// END - TYPES

const maxPasswordLength: number = 128;
const lowerCasedAlphabets = [..."abcdefghijklmnopqrstuvwxyz".split("")];
const upperCasedAlphabets = lowerCasedAlphabets.map((alphabet) =>
  alphabet.toUpperCase()
);
const numbers = [..."1234567890".split("").map((num) => +num)];
const symbols = [..."!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split("")];

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const getRandomPassword = (): string => {
  const randompassword: (string | number)[] = [];
  const params = [
    ...lowerCasedAlphabets,
    ...upperCasedAlphabets,
    ...numbers,
    ...symbols,
  ];
  while (randompassword.length < maxPasswordLength) {
    const randomInt = Math.floor(Math.random() * params.length);
    randompassword.push(params[randomInt]);
  }
  return randompassword.join("");
};

const generatePassword = (options?: Partial<PasswordProps>): string => {
  if (options) {
    const {
      length,
      includeLowerCase,
      includeNumber,
      includeSymbols,
      includeUpperCase,
    } = options;
    const generatedPasssword = [];

    for (let i = 0; i < maxPasswordLength; i++) {
      includeUpperCase &&
        generatedPasssword.push(
          upperCasedAlphabets[getRandomNumber(upperCasedAlphabets.length)]
        );
      includeLowerCase &&
        generatedPasssword.push(
          lowerCasedAlphabets[getRandomNumber(lowerCasedAlphabets.length)]
        );
      includeNumber &&
        generatedPasssword.push(numbers[getRandomNumber(numbers.length)]);
      includeSymbols &&
        generatedPasssword.push(symbols[getRandomNumber(symbols.length)]);
    }

    // returns the randomly generated password if generated password length is 0
    if (!generatedPasssword.length)
      return length ? generatePassword().slice(0, length) : generatePassword();
    return length
      ? generatedPasssword.slice(0, length).join("")
      : generatedPasssword.slice(0, 16).join("");
  }

  return getRandomPassword();
};

const generatePassword2 = (options: Partial<PasswordProps>): string => {
  const {
    length,
    includeLowerCase,
    includeNumber,
    includeSymbols,
    includeUpperCase,
  } = options;

  let charset = "";
  if (includeUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumber) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*";
  if (!length) return "";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export {
  initialValues,
  maxPasswordLength,
  generatePassword,
  generatePassword2,
};
