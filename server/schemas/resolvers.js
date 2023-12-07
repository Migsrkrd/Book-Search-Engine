const {User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id});
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            console.log('User created successfully:', user);
            console.log('Token created successfully:', token);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                console.log('User not found');
                throw new Error('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                console.log('Incorrect password');
                throw new Error('Incorrect password');
            }

            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, { bookInput }, context) => {
            console.log('Resolver execution started');
            console.log('Received bookInput:', bookInput);
          
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookInput } },
                { new: true, runValidators: true }
              );
          
              console.log('User updated successfully:', updatedUser);
          
              return updatedUser;
            } catch (err) {
              console.error('Error in resolver:', err);
              throw new Error('Error saving the book to the user');
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