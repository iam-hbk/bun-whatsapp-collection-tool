// src/controllers/messageController.ts
import { Request, Response } from 'express';
import { sessionController } from './sessionController';

export const messageController = {
  handleIncomingMessage: async (req: Request, res: Response) => {
    const { Body, From } = req.body;
    if (Body.toLowerCase() === 'start') {
      await sessionController.startSession(From);
    } else if (Body.toLowerCase() === 'stop') {
      await sessionController.stopSession(From);
    } else {
      await sessionController.processResponse(From, Body);
    }
    res.status(200).send();
  },
};
