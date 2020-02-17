const express = require("express");
const router = express.Router();

router.post("/checkresponses", (req, res) => {
  let body = req.body;
  switch (body.inputUnit) {
    case "kel":
    case "cel":
    case "fah":
    case "ran":
      body.output = convertTemperatures(body);
      break;
    case "lit":
    case "tab":
    case "cup":
    case "cui":
    case "cuf":
    case "gal":
      body.output = convertVolumes(body);
      break;
    default:
      body.output = "Invalid Input Unit";
      break;
  }
  res.status(200).send(body);
});

const convertTemperatures = entry => {
  const len = entry.studentResponse
    ? (entry.studentResponse.includes(".")
        ? entry.studentResponse.split(".")[1].length
        : 0) > 10
      ? 10
      : entry.studentResponse.includes(".")
      ? entry.studentResponse.split(".")[1].length
      : 0
    : 0;
  if (
    entry.targetUnit === "lit" ||
    entry.targetUnit === "tab" ||
    entry.targetUnit === "cup" ||
    entry.targetUnit === "cui" ||
    entry.targetUnit === "cuf" ||
    entry.targetUnit === "gal"
  )
    return "Invalid";
  if (entry.inputUnit === "kel")
    return convertTemperaturesFromKelvin(entry, len);
  else if (entry.inputUnit === "cel")
    return convertTemperaturesFromCelcius(entry, len);
  else if (entry.inputUnit === "fah")
    return convertTemperaturesFromFahrenheit(entry, len);
  else if (entry.inputUnit === "ran")
    return convertTemperaturesFromRankine(entry, len);
  else return "Invalid";
};

const convertTemperaturesFromCelcius = (entry, len) => {
  if (entry.targetUnit === "cel") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "kel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) + 273.15).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "fah") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * (9 / 5) + 32).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "ran") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * (9 / 5) + 491.67).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertTemperaturesFromKelvin = (entry, len) => {
  if (entry.targetUnit === "kel") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "cel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) - 273.15).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "fah") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * (9 / 5) - 459.67).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "ran") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      ((Number.parseFloat(entry.inputValue) + 273.15) * 1.8 - 491.67).toFixed(
        len
      )
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertTemperaturesFromFahrenheit = (entry, len) => {
  if (entry.targetUnit === "fah") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "cel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue - 32) * (5 / 9)).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "kel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue - 32) * (5 / 9) + 273.15).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "ran") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) + 459.67).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertTemperaturesFromRankine = (entry, len) => {
  if (entry.targetUnit === "ran") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "cel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue - 491.67) * (5 / 9)).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "kel") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * (5 / 9)).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "fah") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) - 459.67).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertVolumes = entry => {
  const len = entry.studentResponse
    ? (entry.studentResponse.includes(".")
        ? entry.studentResponse.split(".")[1].length
        : 0) > 10
      ? 10
      : entry.studentResponse.includes(".")
      ? entry.studentResponse.split(".")[1].length
      : 0
    : 0;
  if (
    entry.inputUnit === "kel" ||
    entry.inputUnit === "cel" ||
    entry.inputUnit === "fah" ||
    entry.inputUnit === "ran"
  )
    return "Invalid";
  if (entry.targetUnit === "lit") return convertVolumesFromLiters(entry, len);
  else if (entry.targetUnit === "tab")
    return convertVolumesFromTableSpoons(entry, len);
  else if (entry.targetUnit === "cup")
    return convertVolumesFromCups(entry, len);
  else if (entry.targetUnit === "cui")
    return convertVolumesFromCubicInches(entry, len);
  else if (entry.targetUnit === "cuf")
    return convertVolumesFromCubicFeet(entry, len);
  else if (entry.targetUnit === "gal")
    return convertVolumesFromGallon(entry, len);
  else return "Invalid";
};

const convertVolumesFromLiters = (entry, len) => {
  if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 67.63).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 4.23).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 61.02).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.04).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.26).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertVolumesFromTableSpoons = (entry, len) => {
  if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 0.015).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.0625).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.902344).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.000522).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.00390625).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};

const convertVolumesFromCubicInches = (entry, len) => {
  if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 0.016387).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.069264).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 1.108).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.000579).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.00433).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};
const convertVolumesFromCubicFeet = (entry, len) => {
  if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 28.316).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 119.688).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 1915.01).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 1728).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 7.48).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};
const convertVolumesFromCups = (entry, len) => {
  if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 0.236588).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.00836).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 16).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 14.4375).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.0625).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};
const convertVolumesFromGallon = (entry, len) => {
  if (entry.targetUnit === "gal") {
    if (
      Number.parseFloat(entry.inputValue).toFixed(len) ===
      Number.parseFloat(entry.studentResponse).toFixed(len)
    )
      return "Correct";
    else return "Incorrect";
  } else if (entry.targetUnit === "lit") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      (Number.parseFloat(entry.inputValue) * 3.78541).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cuf") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 0.133681).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "tab") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 256).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cui") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 231).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else if (entry.targetUnit === "cup") {
    if (
      Number.parseFloat(entry.studentResponse).toFixed(len) ===
      Number.parseFloat(entry.inputValue * 16).toFixed(len)
    )
      return "Correct";
    else return "Incorrect ";
  } else return "Invalid";
};
module.exports = router;
