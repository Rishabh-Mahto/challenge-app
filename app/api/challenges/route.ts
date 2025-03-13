import dbConnect from "@/lib/db";
import Challenge from "@/models/Challenge";
import { createChallenges, getChallenges } from "@/services/challengeService";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const challenges = await getChallenges();
    return NextResponse.json(challenges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const challengeData = await req.json();
    const newChallenge = await createChallenges(challengeData);
    return NextResponse.json(newChallenge, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create challenge" },
      { status: 500 }
    );
  }
}
