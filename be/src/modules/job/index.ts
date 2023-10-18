import express from "express";
import { JobController } from "./job.controller";
import { JobService } from "./job.service";
import { JobRepository } from "../../database/repositories/Job.repository";
import { JobDto } from "./job.dto";
import { forwardError } from "../../utils";

const router = express.Router();

const repo = new JobRepository();
const dto = new JobDto(repo);
const service = new JobService(repo);
const controller = new JobController(service, dto);

router.get("/", forwardError(controller.getList));
router.post("/", forwardError(controller.create));
router.get("/:id", forwardError(controller.getDetail));
router.put("/:id", forwardError(controller.update));
router.delete("/:id", forwardError(controller.delete));

export default router;
