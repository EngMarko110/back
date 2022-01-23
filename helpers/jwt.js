const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/fc110\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/fc110\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/fc110\/users(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/fc110\/orders(.*)/, methods: ["GET", "OPTIONS"] },

      `${api}/users/login`,
      `${api}/users/register`,
      //{ url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
