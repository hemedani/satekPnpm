const numberRange = "[\u06F0-\u06F9]";
const charRange = [
  "[\u06A9\u06AF\u06C0\u06CC\u060C",
  "\u062A\u062B\u062C\u062D\u062E\u062F",
  "\u063A\u064A\u064B\u064C\u064D\u064E",
  "\u064F\u067E\u0670\u0686\u0698\u200C",
  "\u0621-\u0629\u0630-\u0639\u0641-\u0654]"
].join("");
const rtlPunctuations = "(،|؟|«|»|؛|٬)";
const ltrPunctuations = "(\\.|:|\\!|\\-|\\[|\\]|\\(|\\)|/)";

const combineRegExps = (...a: any) => {
  var combined = "(";
  for (var i = 0; i < a.length; i++) {
    combined += "(";
    if (i != a.length - 1) combined += a[i] + ")|";
    else combined += a[i] + ")";
  }
  return combined + ")";
};

export const persianNumberReg = new RegExp("^" + numberRange + "+$");
export const persianLetterReg = new RegExp("^" + charRange + "+$");
export const persianPunctuation = new RegExp(
  "^" + combineRegExps(rtlPunctuations, ltrPunctuations) + "+$"
);
export const persianTextReg = new RegExp(
  "^" +
    combineRegExps(
      numberRange,
      charRange,
      rtlPunctuations,
      ltrPunctuations,
      "\\s"
    ) +
    "+$"
);
export const persianNameReg = new RegExp(
  "^" +
    combineRegExps(charRange, rtlPunctuations, ltrPunctuations, "\\s") +
    "+$"
);
export const persianRtlReg = new RegExp(
  "^" + combineRegExps(charRange, numberRange, rtlPunctuations, "\\s") + "+$"
);

export const persianHasNumberReg = new RegExp(numberRange);
export const persianHasLetterReg = new RegExp(charRange);
export const persianHasPunctuationReg = new RegExp(
  combineRegExps(rtlPunctuations, ltrPunctuations)
);
export const persianHasTextReg = new RegExp(
  combineRegExps(numberRange, charRange, rtlPunctuations, ltrPunctuations)
);
export const persianHasRtlReg = new RegExp(
  combineRegExps(numberRange, charRange, rtlPunctuations)
);

export const englishNameReg = /^( *)+[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)+( *)*$/;

export const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// persianRex.numbersASCIRange = numberRange;
// persianRex.lettersASCIRange = charRange;
// persianRex.rtlPunctuationsASCIRange = rtlPunctuations;
// persianRex.ltrPunctuationsASCIRange = ltrPunctuations;

// //AMD wrapper
// if (typeof define !== "undefined") {
//   define([], persianRex);
//   //NodeJS wrapper
// } else if (typeof exports !== "undefined") {
//   exports.number = persianRex.number;
//   exports.letter = persianRex.letter;
//   exports.punctuation = persianRex.punctuation;
//   exports.text = persianRex.text;
//   exports.hasNumber = persianRex.hasNumber;
//   exports.hasLetter = persianRex.hasLetter;
//   exports.hasPunctuation = persianRex.hasPunctuation;
//   exports.hasText = persianRex.hasText;
//   exports.lettersASCIRange = charRange;
//   exports.numbersASCIRange = numberRange;
//   exports.rtlPunctuationsASCIRange = rtlPunctuations;
//   exports.ltrPunctuationsASCIRange = ltrPunctuations;
//   exports.rtl = persianRex.rtl;
//   exports.hasRtl = persianRex.hasRtl;
// } else {
//   window.persianRex = persianRex;
// }
