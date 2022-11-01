import FlightsModel from "../models/Flight.js";
import { nanoid } from "nanoid";

/**
 * @param {Request} req
 * @param {Response} res
 */

export async function getAllUsers(_, res) {
  try {
    res.status(200);
    res.json({
      message: "list of all flights",
      success: true,
      flights: FlightsModel,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `An error occured while fetching the list of flights - ${error.message}`,
      success: false,
    });
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */

export async function getSingleFlight(req, res) {
  try {
    const { id } = req.params;

    const flight = FlightsModel.find((_flight) => _flight.id === id);

    if (!flight) {
      throw new Error("No user with this id");
    }

    res.status(200);
    res.json({
      message: `found flight with id of id ${id}`,
      success: true,
      flight: flight,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `An error occured while getting details for this flight - ${error.message}`,
      success: false,
    });
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */

export async function createFlight(req, res) {
  try {
    const { title, time, price, date } = req.body;

    const requiredFields = ["title", "time", "price", "date"];
    const errors = [];

    requiredFields.forEach((field) => {
      if (!req.body.hasOwnProperty(field)) {
        errors.push(field);
      }
    });

    if (errors.length > 0)
      throw new Error(
        `${errors[0]} field is required ${
          errors.length > 1 ? `and ${errors.length - 1} more errors` : ""
        }`
      );

    const newFlight = {
      id: nanoid(7),
      title,
      price,
      date,
      time,
      createdAt: new Date(),
      updatedAt: null,
    };

    FlightsModel.push(newFlight);

    res.status(201);
    res.json({
      message: "Successfully created a flight",
      flight: newFlight,
      success: true,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `An error occured while creating this flight - ${error.message}`,
      success: false,
    });
  }
}

export async function deleteFlight(req, res) {
  try {
    const { id } = req.params;

    const flightIndex = FlightsModel.findIndex((flight) => flight.id === id);

    if (flightIndex === -1) {
      throw new Error("This flight is not on the list of flights!");
    }

    const flight = FlightsModel[flightIndex];

    FlightsModel.splice(flightIndex, 1);

    res.status(200);
    res.json({
      message: `successfully deleted flight of id ${id}`,
      success: true,
      flight,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `Cannot delete this flight - ${error.message}`,
      success: false,
    });
  }
}

export async function updateFlight(req, res) {
  try {
    const { body, params } = await req;
    const { id } = params;

    const fields = ["title", "time", "price", "date"];
    const updatedFields = [];
    const flightIndex = FlightsModel.findIndex((flight) => flight.id === id);

    if (flightIndex === -1) {
      throw new Error("This flight is not on the list of flights!");
    }

    const flight = FlightsModel[flightIndex];

    fields.forEach((field) => {
      if (body[field]) {
        updatedFields.push(field);
        flight[field] = body[field];
      }
    });

    FlightsModel[flightIndex].updatedAt = new Date();

    res.status(201);
    res.json({
      message: `successfully updated ${updatedFields.join(", ")} of flight with id ${id}`,
      success: true,
      flight,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: `Cannot update this flight - ${error.message}`,
      success: false,
    });
  }
}
