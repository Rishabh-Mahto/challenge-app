import Challenge from "@/models/Challenge";
import { ChallengeType } from "@/types/type";

export const getChallenges = async () => {
  const data = await Challenge.find({});
  return data;
};

export const createChallenges = async (challenegeData: ChallengeType) => {
  if (!challenegeData.title || challenegeData.duration < 21) {
    throw new Error("Title and minimum 21-day are required");
  }

  const newChallenge = new Challenge(challenegeData);
  await newChallenge.save();
  return newChallenge;
};
