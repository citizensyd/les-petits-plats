// Validate entry
const validateInput = (input) => {
  const textRegex = /^[a-zA-Z\s]{1,50}$/;
  return textRegex.test(input);
};

// Replaces html characters
const escapeHtml = (text) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "`": "&#96;",
  };
  return text.replace(/[&<>"'`]/g, (match) => map[match]);
}

export { validateInput, escapeHtml };
