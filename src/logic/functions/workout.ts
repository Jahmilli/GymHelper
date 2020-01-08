import {
  IComment,
  IRating,
  IWorkout,
  IWorkoutExercise,
} from "../domains/Workout.domain";
import { get, post } from "./core/fetch";

export const getWorkouts = async (userId?: string): Promise<IWorkout> => {
  // If user id is not specified we will get all "shared" workouts
  const queryParam = userId ? `?userId=${userId}` : "";
  const result: any = await get(
    `http://192.168.0.21:3001/api/v1/workout${queryParam}`
  );
  return result.json();
};

export const getWorkoutExercises = async (
  workoutId: number
): Promise<IWorkoutExercise[]> => {
  const exercisesRes: any = await get(
    `http://192.168.0.21:3001/api/v1/workout/exercises?workoutId=${workoutId}`
  );
  return exercisesRes.json();
};

export const createWorkout = async (workout: IWorkout) => {
  return post(
    "http://192.168.0.21:3001/api/v1/workout/create",
    JSON.stringify(workout)
  );
};

export const getComments = async (workoutId: number): Promise<IComment[]> => {
  const result: any = await get(
    `http://192.168.0.21:3001/api/v1/workout/comments?workoutId=${workoutId}`
  );
  return result.json();
};

export const createComment = async (comment: IComment) => {
  return post(
    "http://192.168.0.21:3001/api/v1/workout/comments/create",
    JSON.stringify(comment)
  );
};

export const updateRating = async (
  rating: IRating
): Promise<IRating | null> => {
  return post(
    "http://192.168.0.21:3001/api/v1/ratings/update",
    JSON.stringify(rating)
  ).then((res: any) => res.json());
};
