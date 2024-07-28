const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => !regx.test(email));

  if (invalidEmails.length) {
    return ` These are invalid email ${invalidEmails} `;
  }

  return;
};
