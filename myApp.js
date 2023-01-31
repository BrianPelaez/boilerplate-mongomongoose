require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a DB"))
  .catch((err) => console.log("Error de conexión"));

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const newPerson = new Person({
  name: "Brian Pelaez",
  age: 29,
  favoriteFoods: ["Apple", "Pizza"],
});
const supermario = new Person({
  name: "Super Mario",
  age: 40,
  favoriteFoods: ["Spaghetti"],
});
const luigi = new Person({
  name: "Luigi",
  age: 24,
  favoriteFoods: ["Spaghetti"],
});
const arrayOfPeople = [supermario, luigi];

const createAndSavePerson = (done) => {
  newPerson.save((err, data) => (err ? done(err) : done(null, data)));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) =>
    err ? done(err) : done(null, data)
  );
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, person) =>
    err ? done(err) : done(null, person)
  );
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) =>
    err ? done(err) : done(null, person)
  );
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, person) =>
    err ? done(err) : done(null, person)
  );
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) =>
      err ? done(err) : done(null, updatedPerson)
    );
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //console.log(personName)
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) =>
        (err) ? done(err) : done(null, updatedPerson)
    )

};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

//Source: https://stackoverflow.com/questions/38485575

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
