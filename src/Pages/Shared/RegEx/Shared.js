export const validCountry = new RegExp(
    '^.{1,56}$'
);

export const validCity = new RegExp(
    '^.{1,120}$'
);

export const validUniversity = new RegExp(
    '^.{1,100}$'
);

export const validDescription = new RegExp(
    '^.{5,2000}$'
);

export const validName = new RegExp(
    '^(?=.{1,150}$)[a-zA-Z\u00C0-\u00ff]+(?:[-\'\\s][a-zA-Z\u00C0-\u00ff]+)*$'
);