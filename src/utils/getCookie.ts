const AUTH_COOKIE_RE = /cs-course-select-student-token=(.+)/;

export const getCookie = () => {
  const cookies = unsafeWindow.document.cookie.split("; ");

  for (const cookie of cookies) {
    const match = AUTH_COOKIE_RE.exec(cookie);
    if (match === null)
      continue;
    if (match.length < 2)
      continue;
    return match[1];
  }

  return null;
};
