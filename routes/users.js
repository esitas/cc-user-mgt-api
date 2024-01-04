const express = require("express");
const { json } = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const dataFile = path.join(__dirname, "../data/users.json");

//Route to get all users
/**
 * @openapi
 *  /users:
 *    get:
 *      summary: "Get details for all users"
 *      responses:
 *         "200":
 *             description:  a list of users
 *             content:
 *              application/json:
 *                  example:
 *                      -   userId: 1
 *                          userFirstName: first name
 *                          userLastName: last name
 *                          workLocation: location
 *                          skills: a list of skills the user has
 *         "500":
 *              description: Internal error. could not read users from database
 *
 */
router.get("/users", (req, res) => {
  // read all users from file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("error reading datafile" + err);
      res.status("500");
      return;
    }

    const jsonData = JSON.parse(data);
    const result = jsonData.users;
    res.status("200").json(result);
  });
});

//Route to get an individual user by id
/**
 * @openapi
 * /users/{userId}:
 *  get:
 *      summary: "Get an individual user by id"
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *            description: id of the user required
 *      responses:
 *          "200":
 *            content:
 *               application/json:
 *                  example:
 *                      -userId : 1
 *                      userFirstName: John
 *                      userLastName: Smith
 *                      workLocation: Toronto
 *                      skills: [java, sql]
 */
router.get("/users/:userId", (req, res) => {
  // read userid from parameters
  const userId = parseInt(req.params.userId);
  console.log("finding user");

  //read data from file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("error reading datafile" + err);
      res.status(500);
      return;
    }

    const jsonData = JSON.parse(data);
    const users = jsonData.users;
    // find the required user
    const user = users.find((user) => {
      return user.userId === userId;
    });
    res.status(200).json(user);
    return;
  });
});

// Route to delete a user by id
/**
 * @openapi
 * /users/{userId}:
 *  delete:
 *      summary: Deletes an individual user by id
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: Integer
 *      responses:
 *          "500":
 *              description: Error deleting the user
 *          "200":
 *              description: Deletes the user by id
 *          "404":
 *              description: User Not Found
 */
router.delete("/users/:userId", (req, res) => {
  //get id of user to be deleted
  const userId = parseInt(req.params.userId);

  //read data from file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("Error reading from file" + err);
      res.status(500);
      return;
    }

    const jsonData = JSON.parse(data);
    //get index of user to be deleted
    const index = jsonData.users.findIndex((user) => {
      return user.userId === userId;
    });

    // delete user from the array using the index
    if (index != -1) {
      jsonData.users.splice(index, 1);

      //update the file with the revised array
      fs.writeFile(
        dataFile,
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.log("eror writing to file" + err);
            res.status(500);
            return;
          }
          res.status(200).send("User deleted");
        }
      );
    } else {
      // Return a 404 error if the user was not found
      console.log("User not found");
      res.status(404).send("User not found ");
    }
  });
});

//Route to add a new user
/**
 * @openapi
 * /users:
 *      post:
 *          summary: Receives new user object and writes it to the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      example:
 *                          userFirstName: John
 *                          userLastName: Smith
 *                          workLocation: Vancouver
 *                          skills: [java, sql]
 *          responses:
 *              "500":
 *                  description: Error writing to the file
 *              "200":
 *                  description: New user written to the database
 */
router.post("/users", (req, res) => {
  console.log("Adding new user");
  //read new user from request object
  const newUser = req.body;

  //read the user data from the file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("Error reading from file");
      res.status(500).send("Internal Error");
      return;
    }

    const jsonData = JSON.parse(data);
    // get the next userId to assign
    const nextUserId = jsonData.nextUserId;
    // increment the nextUserId
    jsonData.nextUserId++;
    // assign nextUserId to the new user object
    nextUserId.userId = nextUserId;
    // Add the newUser object to the array
    jsonData.users.push(newUser);
    // Write the data to the file.
    fs.writeFile(dataFile, JSON.stringify(jsonData), "utf-8", (err) => {
      if (err) {
        console.log("Error writing to the file" + err);
        res.status(500).send("Internal Error");
        return;
      }
    });
    res.status(200).send("User Added");
  });
});

// Route to update a user by id
/**
 * @openapi:
 * /users/{userId}:
 *  put:
 *      summary: receives an UpdatedUser object and updates the corresponding user in the database
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: userId of the user to be updated
 *          schema:
 *          type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example:
 *                      userFirstName: John
 *                      userLastName: Smith
 *                      workLocation: Toronto
 *                      skills: [.Net, Java]
 *      responses:
 *          "500":
 *              description: Internal Error
 *          "404":
 *              description: User Not Found
 *          "200":
 *              description: User Updated
 */
router.put("/users/:userId", (req, res) => {
  // read the id from the input parameters
  const userId = parseInt(req.params.userId);

  // read the updatedUser data from the request body and check it is not empty
  const updatedUser = req.body;
  if (!updatedUser) {
    console.log("No update data provided");
    res.status(400).send("Bad Request");
    return;
  }

  // read the data from the file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("Error reading from file" + err);
      res.status(500).send("Internal Error");
      return;
    }
    const jsonData = JSON.parse(data);
    //get the index of the user to be updated
    const index = jsonData.users.findIndex((user) => {
      return user.userId === userId;
    });

    if (index !== -1) {
      jsonData.users[index] = { ...jsonData.users[index], ...updatedUser };
    } else {
      console.log("user not found");
      res.status(404).send("User not found");
      return;
    }

    //write the updated data to the file
    fs.writeFile(dataFile, JSON.stringify(jsonData), "utf8", (err) => {
      if (err) {
        console.log("Error writing to file" + err);
        res.status(500).send("Internal Error");
        return;
      }
      res.status(200).send("User updated: " + userId);
    });
  });
});
module.exports = router;
