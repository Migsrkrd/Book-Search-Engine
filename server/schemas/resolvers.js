const {User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books')

                return userData;
            }

            // throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (_, { authors, description, title, bookId, image, link }, context) => {
            try {
              // Check if the user is logged in
              if (!context.user) {
                throw new Error('You must be logged in to perform this action.');
              }
      
              // Prepare the book data to be added to the user's savedBooks array
              const bookData = { authors, description, title, bookId, image, link };
      
              // Update the user's savedBooks array with the new book data
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
              );
      
              return updatedUser;
            } catch (error) {
              throw new Error(`Error in saveBook resolver: ${error.message}`);
            }
          },
        removeBook: async (parent, {bookId}, context) => {
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }

};

module.exports = resolvers;