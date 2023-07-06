export const Plans = [
  {
    id: "1",
    label: "STEP BE STEP",
    chapters: 1,
  },
  {
    id: "2",
    label: "CONFIDENT PLAN",
    chapters: 2,
  },
  {
    id: "3",
    label: "CUSTOM PATH PLAN",
    chapters: "*",
  },
];
export const Courses = [
  {
    id: "2",
    label: "CUBS",
  },
  {
    id: "3",
    label: "ADVENTURE",
  },
  {
    id: "4",
    label: "ELITE",
  },
];
export const mainPrice = 126;
const lowestPrice = 100;
const Stripe = 2.9;
const Wise = 2.4;
const ChapterRate = 5.5;
const MonthlyRate = 2.5;
const fessFormula = (((100 - Stripe) / 100) * (100 - Wise)) / 100;
export const StepByStepGross = () => {
  return mainPrice / fessFormula;
};
export const ChaptersNet = (numberOfChapters) => {
  if (numberOfChapters < 5) {
    return mainPrice - (ChapterRate / 100) * numberOfChapters * mainPrice;
  } else {
    return lowestPrice;
  }
};

export const ChaptersGross = (numberOfChapters) => {
  return (ChaptersNet(numberOfChapters) / fessFormula) * numberOfChapters;
};

export const StepByStepInstallmentPrice = (months) => {
  const gross = StepByStepGross();
  return gross + gross * (MonthlyRate / 100) * months;
};
