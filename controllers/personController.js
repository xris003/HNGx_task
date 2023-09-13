const { validationResult, body } = require("express-validator");
const { response } = require("express");
const Person = require("../models/personModels");

exports.getPerson = (req, res, next) => {
  Person.find()
    .then((response) => {
      res.status(200).json({
        status: "success",
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Errorrr",
      });
    });
};

exports.createPerson = [
  // Use express-validator to validate 'name', 'email', and 'age' fields
  body("name").isString().withMessage("Name must be a string"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("age").isInt().withMessage("Age must be a valid integer"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation passed; proceed with creating the person
    const person = new Person({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });

    person
      .save()
      .then((response) => {
        res.status(201).json({
          message: "New person created",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Data Creation Error",
        });
      });
  },
];

exports.updatePerson = (req, res, next) => {
  let personID = req.body.personID;

  let updatedData = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };

  Person.findOneAndUpdate(personID, { $set: updatedData })
    .then(() => {
      res.status(200).json({
        status: "success",
        data: {
          person: updatedData,
        },
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occurred",
      });
    });

  // 1) Filtered out unwanted fields
  // const filteredBody = filterObj(req.body, "name", "email");
  // if (req.file) filteredBody.photo = req.file.filename;

  // const updatedPerson = await User.findByIdAndUpdate(
  //   req.user.id,
  //   filteredBody,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );
};

exports.deletePerson = (req, res, next) => {
  let personID = req.body.personID;
  Person.findByIdAndRemove(personID)
    .then(() => {
      res.json({
        message: "Deleted Successfully",
      });
    })
    .catch((error) => {
      req.json({
        message: "Sorry error occured",
      });
    });
};
