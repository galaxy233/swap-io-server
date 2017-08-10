// TODO populate db with 10,000 items located across the US and Canada
// name, description, condition, zipcode, usd_value
const fs = require('fs');
const _ = require('lodash');
const Sentencer = require('Sentencer');
const zipcodes = require('./codes.json');

const templates = [
  "This item is really {{ an_adjective }}! Coming all the way from {{ a_noun }}, there is no better time than now to trade your {{ noun }} for something like this.",
  "Welcome to the future of SWAP. Trade your {{ noun }} today and make swap happen.",
  "The time to start trading is now. Gather all of your belongings and see what you can trade for!"
]

const nouns = require('./nouns.json');
const adjectives = ["Green", "Yellow", "Red", "Orange", "Awesome", "Super", "Crazy", "Enormous", "Small", "Special"]

function Item(name, description, condition, zipcode, usd_value) {
  this.name = name;
  this.description = description;
  this.condition = condition;
  this.zipcode = zipcode;
  this.usd_value = usd_value;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const genItemName = () => {
  return _.sample(adjectives) + ' ' + _.sample(nouns.nouns)
}

const genDescription = () => {
  return Sentencer.make(_.sample(templates))
}

const genCondition = () => {
  return Math.random() > 0.5 ? "New" : "Used"
}

const getRandomZipcode = () => {
  return _.sample(zipcodes.codes)
}

const getRandomValue = () => {
  return Math.floor(Math.random() * 990 + 10)
}

const generateItem = () => {
  let name = genItemName();
  let description = genDescription();
  let condition = genCondition();
  let user_id = getRandomIntInclusive(1,3);
  let zipcode = getRandomZipcode();
  let usd_value = getRandomValue();

  return `('${name}', '${description}', '${condition}', ${user_id}, '${zipcode}', ${usd_value}),`;
}

let items = []

for (var i=0; i<1000; i++) {
  items.push(generateItem())
}
//(name, description, user_id, condition, image1, zipcode, usd_value)

fs.writeFile('insertItems.txt', items.join('\n'), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
})
