const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Meal {
        mealId: String!
        label: String!
        imageURL: String
        mealURL: String
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

    input mealInput {
        mealId: String!
        label: String!
        imageURL: String
        mealURL: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveMeal(input: mealInput): User
        removeMeal(mealId: String!): User
    }

`;

module.exports = typeDefs; 