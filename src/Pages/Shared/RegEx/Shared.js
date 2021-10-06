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
    '^[\\s\\S]{1,5000}$'
);

export const validName = new RegExp(
    '^[\\s\\S]{1,300}$'
);

export const validURL = new RegExp(
    'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
);
