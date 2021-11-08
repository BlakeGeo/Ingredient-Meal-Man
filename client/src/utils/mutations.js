import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_MEAL = gql`
  mutation saveMeal($input: mealInput) {
    saveMeal(input: $input) {
      username
      _id
      savedMeals {
        mealId
        label
        imageURL
        mealURL
      }
    }
  }
`;

export const REMOVE_MEAL = gql`
  mutation removeMeal($mealId: String!) {
    removeMeal(mealId: $mealId) {
      _id
      username
      savedMeals {
        mealId
        label
        imageURL
        mealURL
      }
    }
  }
`;