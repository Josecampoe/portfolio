export const validationPatterns = {
  name: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]{2,60}$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  message: /^[\s\S]{10,1000}$/,
};

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, boolean>>;

export function validateContact(fields: ContactFields): ContactErrors {
  return {
    name: !validationPatterns.name.test(fields.name.trim()),
    email: !validationPatterns.email.test(fields.email.trim()),
    message: !validationPatterns.message.test(fields.message.trim()),
  };
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
