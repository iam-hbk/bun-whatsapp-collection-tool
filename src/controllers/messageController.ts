// src/controllers/messageController.ts
import { Request, Response } from "express";
import { sessionController } from "./sessionController";
import { userModel } from "../models/userModel";

export const messageController = {
  handleIncomingMessage: async (req: Request, res: Response) => {
    const { Body, From } = req.body;
    const user_number = From.split(":")[1];
    const isActive = userModel.getStatus(user_number);

    if (Body.toLowerCase() === "start") {
      await sessionController.startSession(From);
    } else if (Body.toLowerCase() === "stop") {
      await sessionController.stopSession(From);
    } else {
      if (!isActive) {
        await sessionController.handleMustStartSession(From);
      } else {
        await sessionController.processResponse(From, Body);
      }
    }
    res.status(200).send();
  },
};
