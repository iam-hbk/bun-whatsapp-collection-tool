import Data, { IData, Label, Status } from "../models/data";

export const createData = async (
  text: string,
  id: Number
): Promise<Boolean> => {
  try {
    const data = new Data({
      id,
      text,
      label: Label.UNKNOW,
      status: Status.UNCLASSIFIED,
    });
    await data.save();
    return !!data;
  } catch (error) {
    throw error;
  }
};

export const classifyData = async (
  id: number,
  label: Label,
  language: string
): Promise<Boolean> => {
  try {
    const data = await Data.findOneAndUpdate(
      { id },
      { label, status: Status.PENDING_REVIEW, language }
    );
    return !!data;
  } catch (error) {
    throw error;
  }
};

export const reviewData = async (
  id: number,
  label: Label,
  language: string
): Promise<Boolean> => {
  try {
    if (label === Label.UNKNOW) throw new Error("Label cannot be UNKNOW");

    const data = await Data.findOneAndUpdate(
      { id },
      { label, status: Status.CLASSIFIED, language }
    );
    return !!data;
  } catch (error) {
    throw error;
  }
};

export const getOneUnclassifiedData = async (): Promise<IData | string> => {
  try {
    const data = await Data.findOne({ status: Status.UNCLASSIFIED });
    if (!data) return "No unlabelled data available at the moment.";
    return data;
  } catch (error) {
    return "Failed to get unlabelled data, please try again later.";
  }
};

export const getOnePendingReviewData = async (): Promise<IData | string> => {
  try {
    const data = await Data.findOne({ status: Status.PENDING_REVIEW });
    if (!data) return "No data pending review at the moment.";
    return data;
  } catch (error) {
    return "Failed to get data pending review, please try again later.";
  }
};
export const getAllData = async (): Promise<IData[] | null> => {
  try {
    const data = await Data.find();
    return data;
  } catch (error) {
    throw error;
  }
};
