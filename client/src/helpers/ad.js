export function formatNumber(number) {
    if (isNaN(number)) {
      return "Invalid Number";
    }
    const hundred = 100;
    const thousand = 1000;
    const lakh = 100000;
    const crore = 10000000;

    if (number >= crore) {
      const crores = Math.floor(number / crore);
      const remainder = number % crore;
      return `${crores} ${
        crores > 1 ? "Crores" : "Crore"
      } ${formatNumber(remainder)}`;
    } else if (number >= lakh) {
      const lakhs = Math.floor(number / lakh);
      const remainder = number % lakh;
      return `${lakhs} ${
        lakhs > 1 ? "Lakhs" : "Lakh"
      } ${formatNumber(remainder)}`;
    } else if (number >= thousand) {
      const thousands = Math.floor(number / thousand);
      const remainder = number % thousand;
      return `${thousands} ${
        thousands > 1 ? "Thousands" : "Thousand"
      } ${formatNumber(remainder)}`;
    } else if (number >= hundred) {
      const hundreds = Math.floor(number / hundred);
      const remainder = number % hundred;
      return `${hundreds} ${
        hundreds > 1 ? "Hundreds" : "Hundred"
      } ${formatNumber(remainder)}`;
    } else {
      return `(Negotiable)`; // Handle numbers less than hundred
    }
  }