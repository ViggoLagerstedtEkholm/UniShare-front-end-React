export const validEmail = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
);

export const validPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,80}$'
);

export const validFirstname = new RegExp(
    '^(?=.{2,100}$)[a-zA-Z\u00C0-\u00ff]+(?:[-\'\\s][a-zA-Z\u00C0-\u00ff]+)*$'
);

export const validLastname = new RegExp(
    '^(?=.{2,100}$)[a-zA-Z\u00C0-\u00ff]+(?:[-\'\\s][a-zA-Z\u00C0-\u00ff]+)*$'
);

export const validUsername = new RegExp(
    '^(?=[a-zA-Z0-9._]{2,50}$)(?!.*[_.]{2})[^_.].*[^_.]$'
);

export const validDescription = new RegExp(
    '^.{0,500}$'
);

export const validAge = new RegExp(
    '^(?:1[01][0-9]|120|1[3-9]|[2-9][0-9])$'
)