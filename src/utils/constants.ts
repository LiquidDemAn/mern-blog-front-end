export const PASSWORDMINLENGTH = 5;
export const NICKNAMEMINLENGTH = 3;

export const getLengthErrorText = (length: number) =>
  `Must be at least ${length} characters long!`;
export const requiredFieldText = `It's required field!`;

export const fullNameValidationText =
  'Full name must be contain two words (John Smith)';
export const nickNameValidationText = `Nick name must be at least ${NICKNAMEMINLENGTH} characters long and not contain spaces and special characters (except underscores!)`;

export const emailValidationText = 'Must be validate email! (test@gmail.com)';
export const passwordValidationText = `Password must be at least ${PASSWORDMINLENGTH} characters long`;

export const fullNameRegex = /^[[A-Z][a-z]*\s[A-Z][a-z]*$/;
export const nickNameRegex = /^[a-z0-9_]{3,}$/;

export const emailRegex = /^([a-z0-9]+)@([a-z]{2,})\.[a-z]{2,}$/;

export const passwordRegex = /^\w{5,}$/;
