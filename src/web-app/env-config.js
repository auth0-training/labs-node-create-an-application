const {
  ISSUER_BASE_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET = 'a long, randomly-generated string stored in env',
  PORT = 7777,
} = process.env;

const appUrl = `http://localhost:${PORT}`;

function checkUrl() {
  return (req, res, next) => {
    const host = req.headers.host;
    if (!appUrl.includes(host)) {
      return res.status(301).redirect(appUrl);
    }
    return next();
  };
}

function removeTrailingSlashFromUrl(url) {
  if (!url || !url.endsWith('/')) return url;

  return url.substring(0, url.length - 1);
}

console.log('\n----------------------------------');
console.log('Envronment Settings:');
console.log(`ISSUER_BASE_URL: ${ISSUER_BASE_URL}`);
console.log(`API_URL: ${API_URL}`);
console.log(`CLIENT_ID: ${CLIENT_ID}`);
if (CLIENT_SECRET) console.log(`CLIENT_SECRET: Has Value`);
else console.log(`CLIENT_SECRET: Not Set`);
console.log(`APP_URL: ${appUrl}`);
console.log(`SESSION_SECRET: ${SESSION_SECRET}`);
console.log('----------------------------------\n');

module.exports = {
  checkUrl,
  APP_URL: appUrl,
  API_URL: removeTrailingSlashFromUrl(API_URL),
  ISSUER_BASE_URL: removeTrailingSlashFromUrl(ISSUER_BASE_URL),
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  SESSION_SECRET: SESSION_SECRET,
  PORT: PORT,
};
