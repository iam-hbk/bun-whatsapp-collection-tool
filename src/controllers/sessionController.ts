// src/controllers/sessionController.ts

import { userModel } from "../models/userModel";
import { dataModel } from "../models/dataModel";
import { whatsappService } from "../services/whatsappServices";

export const sessionController = {
  async startSession(user: string) {
    // Set user status to 'active' in the database
    await userModel.setActive(user);

    // Send the first unlabeled data item to the user
    const data = await dataModel.getUnlabeledData();
    if (data) {
      await whatsappService.sendMessage(user, data.text);
    } else {
      await whatsappService.sendMessage(
        user,
        "No unlabeled data available at the moment."
      );
    }
  },

  async stopSession(user: string) {
    // Set user status to 'inactive' in the database
    await userModel.setInactive(user);

    // Optionally, send a confirmation message to the user
    await whatsappService.sendMessage(
      user,
      "You have stopped the labeling session. Thank you!"
    );
  },

  async processResponse(user: string, response: string) {
    // Update the database with the user's response
    if (response.split(" ").length != 2) {
      await whatsappService.sendMessage(
        user,
        "Invalid response.\n Please try again.\n Example: 43 positive"
      );
      return;
    }

    let res = {
      id: Number(response.toLowerCase().split(" ")[0]),
      label: response.toLowerCase().split(" ")[1],
    };

    await dataModel.updateLabel(res);

    // Send the next unlabeled data item to the user
    const data = await dataModel.getUnlabeledData();
    if (data) {
      await whatsappService.sendMessage(user, data.text);
    } else {
      await whatsappService.sendMessage(
        user,
        "No more unlabeled data available. Thank you for your contributions!"
      );
      // Optionally, stop the session
      await this.stopSession(user);
    }
  },
};
