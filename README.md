# Code Challenge: User Management CRUD API

## Introduction

Welcome to the User Management CRUD API code challenge! This challenge is designed to test your skills in branching, checking out code, and creating a basic CRUD API for managing users.

## Instructions

### Step 1: Set Up

1. **Clone the Repository:**

   - Start by cloning the existing repository provided to you.

     ```bash
     git clone <repository_url>
     ```

2. **Create a Branch:**

   - Once cloned, create a new branch to work on your changes.

     ```bash
     git checkout -b <your first name>-api-challenge
     ```

3. **Data Storage:**

   - The user data will be stored in a flat file of JSON objects. Each user object has the following format:

     ```json
     {
       "userId": <number>,
       "userFirstName": <string>,
       "userLastName": <string>,
       "workLocation": <string>,
       "skills": [ <string>, <string> ]
     }
     ```

   - Create a file named data.json to store the user objects.
   - Additionally the file will need to keep track of the userId sequence

### Step 3: CRUD API

**Create API Endpoints:**

- Implement basic CRUD endpoints for managing users. Include endpoints for:
  - Creating a new user
  - Retrieving all users
  - Retrieving a specific user by ID
  - Updating an existing user
  - Deleting a user by ID

### Step 4: Testing

1. **Unit Tests:**

   - Write unit tests to ensure the functionality of your CRUD API.

2. **Test Data:**
   - Create a set of test data to validate the operations of your API.

### Step 5: Submission

**Commit and Push:**

- Commit your changes and push your branch to the remote repository.

  ```bash
  git commit -m "Implemented User Management CRUD API"
  git push origin user-api-challenge
  ```

### Step 6: Review

1. **Code Review:**

   - Expect a code review from your peers. Be prepared to address any feedback.

2. **Demo:**
   - Be ready to provide a brief demo of your CRUD API.

## Conclusion

Congratulations! You've completed the User Management CRUD API code challenge.
This exercise is designed to assess your skills in branching, checking out code, and creating a basic CRUD API.
Good luck!
