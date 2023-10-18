import express from "express";
import { API_PATH } from "../constant";
import jobModule from "./job";

const router = express.Router();

// manage routes
router.use(API_PATH.job.main, jobModule);

export default router;
