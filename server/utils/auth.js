const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    console.log('req.headers.authorization:', req.headers.authorization);
    console.log('req.users:', req.users);

    // verify token and get user data out of it
    try {
      const { user } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = user;
    } catch {
      console.log('Invalid token');
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ user: payload }, secret, { expiresIn: expiration });
  },
};
