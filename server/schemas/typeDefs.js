const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Meal {
        mealId: Int!
        title: String!
        description: String
        imageURL: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String
        savedMeals: [Meal]
    }

    type Auth {
        token: ID!
        user: User
    }

    type mealInput {
        mealId: Int
        title: String
        description: String
        imageURL: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveMeal(input: mealInput): User
        removeMeal(mealId: Int!): User
    }

`;

module.exports = typeDefs; 