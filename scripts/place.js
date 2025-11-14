
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

const temp = 10;
const wind = 5;

const calculateWindChill = (t, s) => {
  return (
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(s, 0.16) +
    0.3965 * t * Math.pow(s, 0.16)
  ).toFixed(1);
}

const canCalculate =
  temp <= 10 && wind > 4.8;

const windchill = canCalculate
  ? calculateWindChill(temp, wind) + " °C"
  : "N/A";

document.getElementById("windchill").textContent = windchill;
