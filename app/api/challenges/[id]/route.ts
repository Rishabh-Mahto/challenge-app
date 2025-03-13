import dbConnect from "@/lib/db";
import Challenge from "@/models/Challenge";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const challenge = await Challenge.findById(params.id);
    if (!challenge) throw new Error("Challenge not found");
    return NextResponse.json(challenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenge details" },
      { status: 500 }
    );
  }
}

//update the challenege by Id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const challengeData = await req.json();
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      params.id,
      challengeData,
      { new: true }
    );
    if (!updatedChallenge) throw new Error("Challenge not found");
    return NextResponse.json(updatedChallenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update challenge" },
      { status: 500 }
    );
  }
}

//delete the challenge by Id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(params.id);
    if (!deletedChallenge) throw new Error("Challenge not found");
    return NextResponse.json(deletedChallenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete challenge" },
      { status: 500 }
    );
  }
}

//Update the tasks of the challenge by Id
export async function PATCH(
  req: NextRequest,
  { params }: { params: { challengeId: string; taskId: string } }
) {
  dbConnect();

  try {
    const { isCompleted } = await req.json();

    const challenge = await Challenge.findById(params.challengeId);

    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    const task = challenge.tasks.id(params.taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    task.isCompleted = isCompleted;

    if (isCompleted) {
      task.completedAt = new Date();
    }

    await challenge.save();

    return NextResponse.json(
      { message: "Task updated successfully", task },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
