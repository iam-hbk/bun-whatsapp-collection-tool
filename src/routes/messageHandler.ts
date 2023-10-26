import { Request, Response } from "express";
import { getUser, setActive, setInactive } from "../controllers/userController";
import { IData } from "../models/data";
import { whatsappService } from "../services/whatsappServices";
import { getOneUnclassifiedData } from "../controllers/dataController";

export default async function handleIncomingMessage(
  res: Response,
  req: Request
): Promise<void> {
  /**
   * Handles incoming message from Twilio Webhook,
   * and sends back a response to Twilio to confirm receipt of message
   *
   * The function gets the message body and the user's phone number from the request body,
   * cleans the user's phone number by removing the "whatapp:" prefix,
   * calls the appropriate controller depending on the message
   *
   * @param {Response} res - Express Response object
   * @param {Request} req - Express Request object
   * @returns {void}
   * @example handleIncomingMessage(res, req);
   *
   */

  //get the message body and the user's phone number
  const { Body, From } = req.body;

  //clean the user's phone number by removing the "whatapp:" prefix
  const user_number = From.split(":")[1];

  //fecth the user from the database and check if the user is active
  const user_ = await getUser(user_number);
  const isActive = user_?.isActive;

  if (Body.toLowerCase() === "start") {
    //activate the user's session
    try {
      setActive(user_number);
    } catch (error) {
      const message = "Failed to start the session, please try again later.";
      whatsappService.sendMessage(user_number, message);
    }
  } else if (Body.toLowerCase() === "stop") {
    //deactivate the user's session
    try {
      setInactive(user_number);
    } catch (error) {
      const message = "Failed to stop the session, please try again later.";
      whatsappService.sendMessage(user_number, message);
    }
  } else {
    if (!isActive) {
      //if the user is not active, send a message to the user to start the session
      const message = "Please type *start* to start the session";
      whatsappService.sendMessage(user_number, message);
    } else {
      let data = await getOneUnclassifiedData();
      let message: string;
      if (typeof data !== "string") {
        message = prepareUnclassifiedDataMessage(data);
      }
      message = prepareUnclassifiedDataMessage(null);
      whatsappService.sendMessage(user_number, message);
    }
  }
  res.status(200).send();
}

export function prepareUnclassifiedDataMessage(data: IData | null): string {
  /**
   * Prepares a message to be sent to the user
   * containing the unlabeled data
   *
   * @param {IData} data - unlabeled data
   * @returns {string} - message to be sent to the user
   * @example prepareUnclassifiedDataMessage(data);
   * @example prepareUnclassifiedDataMessage(null);
   */

  if (!data) return "No unlabeled data available at the moment.";

  const { id, text, language } = data;
  const message = `
    *ID:* ${id}
    *Text:* ${text}
    please classify the above text to one of the following labels and provide the language of the text:
    \n*positive*\n*negative*\nor *neutral*

    \nExample: 43 positive english
    
    `;
  return message;
}
