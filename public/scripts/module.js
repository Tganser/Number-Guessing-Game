function randomNumber(min, max){
  console.log("in module");
    return Math.floor(Math.random() * (1 + max - min) + min);

}
module.exports = randomNumber;
