const BAYBAYIN: Record<string, string> = {
  a: "ᜀ",
  e: "ᜁ",
  i: "ᜁ",
  o: "ᜂ",
  u: "ᜂ",

  ka: "ᜃ",
  ke: "ᜃᜒ",
  ki: "ᜃᜒ",
  ko: "ᜃᜓ",
  ku: "ᜃᜓ",

  ga: "ᜄ",
  ge: "ᜄᜒ",
  gi: "ᜄᜒ",
  go: "ᜄᜓ",
  gu: "ᜄᜓ",

  nga: "ᜅ",
  nge: "ᜅᜒ",
  ngi: "ᜅᜒ",
  ngo: "ᜅᜓ",
  ngu: "ᜅᜓ",

  ta: "ᜆ",
  te: "ᜆᜒ",
  ti: "ᜆᜒ",
  to: "ᜆᜓ",
  tu: "ᜆᜓ",

  da: "ᜇ",
  de: "ᜇᜒ",
  di: "ᜇᜒ",
  do: "ᜇᜓ",
  du: "ᜇᜓ",

  na: "ᜈ",
  ne: "ᜈᜒ",
  ni: "ᜈᜒ",
  no: "ᜈᜓ",
  nu: "ᜈᜓ",

  pa: "ᜉ",
  pe: "ᜉᜒ",
  pi: "ᜉᜒ",
  po: "ᜉᜓ",
  pu: "ᜉᜓ",

  ba: "ᜊ",
  be: "ᜊᜒ",
  bi: "ᜊᜒ",
  bo: "ᜊᜓ",
  bu: "ᜊᜓ",

  ma: "ᜋ",
  me: "ᜋᜒ",
  mi: "ᜋᜒ",
  mo: "ᜋᜓ",
  mu: "ᜋᜓ",

  ya: "ᜌ",
  ye: "ᜌᜒ",
  yi: "ᜌᜒ",
  yo: "ᜌᜓ",
  yu: "ᜌᜓ",

  la: "ᜎ",
  le: "ᜎᜒ",
  li: "ᜎᜒ",
  lo: "ᜎᜓ",
  lu: "ᜎᜓ",

  wa: "ᜏ",
  we: "ᜏᜒ",
  wi: "ᜏᜒ",
  wo: "ᜏᜓ",
  wu: "ᜏᜓ",

  sa: "ᜐ",
  se: "ᜐᜒ",
  si: "ᜐᜒ",
  so: "ᜐᜓ",
  su: "ᜐᜓ",

  ha: "ᜑ",
  he: "ᜑᜒ",
  hi: "ᜑᜒ",
  ho: "ᜑᜓ",
  hu: "ᜑᜓ",

  ra: "ᜇ",
  re: "ᜇᜒ",
  ri: "ᜇᜒ",
  ro: "ᜇᜓ",
  ru: "ᜇᜓ",

  // Filipino F / V / J / C / X / Z are normally
  // represented using their closest native sounds.
};

const VIRAMA = "᜔";

export function translateToBaybayin(input: string): string {
  const word = input.toLowerCase();

  let result = "";
  let i = 0;

  while (i < word.length) {
    // Preserve spaces and punctuation
    if (!/[a-zñ]/.test(word[i])) {
      result += word[i];
      i++;
      continue;
    }

    // Handle consonant + vowel syllables
    if (i + 1 < word.length) {
      const syllable = word.slice(i, i + 2);

      if (BAYBAYIN[syllable]) {
        result += BAYBAYIN[syllable];
        i += 2;
        continue;
      }
    }

    // Handle standalone vowels
    if (BAYBAYIN[word[i]]) {
      result += BAYBAYIN[word[i]];
      i++;
      continue;
    }

    // Unknown consonant: look ahead to see if it's a final consonant
    if (/[bcdfghjklmnpqrstvwxyzñ]/.test(word[i])) {
      result += VIRAMA;
    }

    i++;
  }

  return result;
}
