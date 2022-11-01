import { Router } from "express";
const router = Router();
import {
  createFlight,
  deleteFlight,
  getAllUsers,
  getSingleFlight,
  updateFlight,
} from "../controllers/flightController.js";

router
  .get("/", getAllUsers)
  .get("/:id", getSingleFlight)
  .post("/", createFlight)
  .delete("/:id", deleteFlight)
  .patch("/:id", updateFlight);

export default router;
