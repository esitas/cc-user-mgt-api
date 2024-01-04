const express = require("express");
const { json } = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const config = require("../config");
const dataFile = path.join(__dirname, "../data/users.json");

//Route for search
/**
 * @openapi:
 * /search:
 *  get:
 *      summary: Returns a list of users that match the search citeria
 *      parameters:
 *          - in: query
 *            name: keyword
 *            description: Value to search the user properties for
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          500:
 *             description: Internal Error
 *          200:
 *              description: A list of users that match the search criteria
 *              content:
 *                  application/json:
 *                      userId: 1
 *                      userFirstName: John
 *                      userLastName: Smith
 *                      workLocation: Toronto
 *                      skills: [java, sql]
 */
router.get("/search", (req, res) => {
  // read keyword from parameters
  const keyword = req.query.keyword;

  // read data from file
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.log("Error reading file" + err);
      res.status(500).send("Internal Error");
      return;
    }

    const jsonData = JSON.parse(data);
    //filter the array using the keyword
    const results = jsonData.users.filter((user) => {
      return Object.values(user)
        .map((value) => String(value).toLowerCase())
        .some((value) => value.includes(keyword.toLowerCase()));
    });

    if (!results) {
      res.status(200).send("No matching results");
      return;
    }
    res.status(200).json(results);
  });
});

module.exports = router;
