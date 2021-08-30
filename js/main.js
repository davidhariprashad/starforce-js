function getSelection(className) {
  return parseInt(document.getElementsByClassName(className)[0].value);
}

function getCheckedArray(className) {
  array = [];
  Array.from(document.getElementsByClassName(className)).forEach((box) => {
    array[box.value] = box.checked;
  });
  return array;
}

function getTextarea() {
  return document.getElementsByClassName("text")[0];
}

function getButton() {
  return document.getElementsByClassName("start")[0];
}

function output(start, goal, results, sequence, limit = 10000) {
  const delim = " ";
  if (start >= goal) {
    return "Initial starforce level meets the goal starforce level.";
  }
  else if (goal < 23) {
    return `${results.join("\n")}\n${sequence.join(delim)}`;
  }
  else {
    return `${results.join("\n")}\nLast ${Math.min(limit,sequence.length)} ...\n${sequence.slice(-1*limit).join(delim)}`;
  }
}

function printArray(array) {
  array.forEach((e, i) => {
    console.log(`${i} --- ${e}`)
  });
}

function run() {
  const level = getSelection("level-select");
  const start = getSelection("start-select");
  const goal = getSelection("goal-select");
  const starcatchArray = getCheckedArray("starcatch-input");
  const safeguardArray = getCheckedArray("safeguard-input");
  const sunnySundayArray = getCheckedArray("sunny-sunday-input");
  const [baseCost, adjustedCost] = calculateCost(level, safeguardArray, sunnySundayArray);
  const rates = calculateRates(starcatchArray, safeguardArray, sunnySundayArray);
  const textarea = getTextarea();
  const [mesos, booms, chanceTimes, steps, sequence] = starforce(start, goal, baseCost, adjustedCost, rates);
  const results = [
    `Mesos: ${mesos.toLocaleString()}`,
    `Destroyed Equips: ${booms.toLocaleString()}`,
    `Chance Times: ${chanceTimes.toLocaleString()}`,
    `Enhancements: ${steps.toLocaleString()}`];
  textarea.innerHTML = output(start, goal, results, sequence);
  console.log(results.join("\n"));
}

function simulate() {
  run();
}
