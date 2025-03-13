export interface TaskType {
  title: string;
  description?: string;
  isCompleted: Boolean;
  completedAt?: Date;
}

export interface ChallengeType {
  title: string;
  duration: number;
  tasks: TaskType[];
  completedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
