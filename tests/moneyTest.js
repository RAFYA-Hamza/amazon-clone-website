import { formatCurrencey } from "../scripts/utils/money.js";

if (formatCurrencey(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrencey(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrencey(2000.6) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
