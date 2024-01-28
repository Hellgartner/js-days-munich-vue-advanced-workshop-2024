export type EstimationVariant = 'fibonacci' | 'shirtSize';

const scrumEstimationValues: Record<EstimationVariant, string[]> = {
  fibonacci: [
    "cup",
    "?",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "55",
    "89",
    "∞",
  ],
  shirtSize: ["cup", "?", "XS", "S", "M", "L", "XL", "XXL", "∞"],
};
export default scrumEstimationValues;
