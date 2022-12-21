import { asyncWrapper } from "../middleware/asyncWrapper.js";

export const getAllJobs = asyncWrapper(async (req, res, next) => {
  res.send("get all jobs");
});

export const getJob = asyncWrapper(async (req, res, next) => {
  res.send("get job");
});
export const createJob = asyncWrapper(async (req, res, next) => {
  res.send("create job");
});
export const updateJob = asyncWrapper(async (req, res, next) => {
  res.send("update job");
});
export const deleteJob = asyncWrapper(async (req, res, next) => {
  res.send("delete job");
});
