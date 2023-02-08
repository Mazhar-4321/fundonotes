import Note from '../models/note.model';
import logger from '../config/myLogger';
import { client } from '../index.js';
const nodemailer = require('nodemailer');


export const createNote = async (note) => {
  try {
    const data = await Note.create(note);
    if (data) {
      updateRedis(req.body.userId)
      logger.info(`Note Created Successfully for ${data._id}`)
      return data;
    } else {
      logger.error("Error Creating Note")
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.error("Error Creating Note")
    throw new Error(err);
  }
};

export const deleteNote = async (req) => {
  try {
    const filter = {
      _id: req.params.id,
      userId: req.body.userId,
      trash: false
    };
    const update = {
      trash: true
    };
    const data = await Note.findOneAndUpdate(filter, update);
    if (data) {
      updateRedis(req.body.userId)
      logger.info(`Note Deleted Successfully Of ${req.params.id}`)
      return data;
    } else {
      logger.error(`Note Deletion Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.error(`Note Deletion Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

export const findNote = async (req) => {

  try {
    const data = await Note.findOne({
      _id: req.params.id,
      userId: req.body.userId
    });
    console.log("Reached Here")
    if (data) {
      logger.info(`Note Fetched Successfully For ${req.params.id}`)
      return data;
    } else {
      logger.info(`Note Retrieval Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Note Retrieval Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

export const findAllNotes = async (userId) => {
  try {
    const data = await Note.find({
      userId: userId
    });
    if (data) {
      const cachedData = await client.HSET(userId, "userData", JSON.stringify(data))
      logger.info(`Notes Retrieved Successfully , Volume=${data.length}`)
      return data;
    } else {
      logger.error(`Notes Retrieval Failed For ${userId}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.error(`Notes Retrieval Failed For ${userId}`)
    throw new Error(err);
  }
};

export const updateNote = async (req) => {
  try {
    const filter = { _id: req.params.id, userId: req.body.userId, new: true };
    const update = req.body;
    const data = await Note.findByIdAndUpdate(filter, update);
    if (data) {
      updateRedis(req.body.userId)
      logger.info(`Note Updated Successfully  For ${data._id}`)
      return data;
    } else {
      logger.info(`Note Updated Failed  For ${data._id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Note Updated Failed  For ${data._id}`)
    throw new Error(err);
  }
};

export const findAllTrashNotes = async (userId) => {
  try {
    const data = await Note.find({ trash: true, userId: userId });
    if (data) {
      logger.info(`Trashed Notes Retrieval Successful For ${userId}`)
      return data;
    } else {
      logger.info(`Trashed Notes Retrieval Failed For ${userId}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Trashed Notes Retrieval Failed For ${userId}`)
    throw new Error(err);
  }
};

export const findTrashNote = async (req) => {
  try {
    const data = await Note.findOne({
      _id: req.params.id,
      trash: true,
      userId: req.body.userId
    });
    if (data) {
      logger.info(`Trashed Note By Id Retrieval Successful For ${req.params.id}`)
      return data;
    } else {
      logger.info(`Trashed Note By Id Retrieval Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Trashed Note By Id Retrieval Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

export const updateTrashNote = async (req) => {
  try {
    const filter = { _id: req.params.id, userId: req.body.userId, new: true };
    const trashNote = await Note.findOne({
      _id: req.params.id,
      userId: req.body.userId
    });
    const update = { trash: !trashNote.trash };
    const data = await Note.findByIdAndUpdate(filter, update);
    if (data) {
      updateRedis(req.body.userId)
      logger.info(`Note By Id Sent To Trash For ${req.params.id}`)
      return data;
    } else {
      logger.info(`Note By Id Sent To Trash Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Note By Id Sent To Trash Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

export const deleteTrashNote = async (req) => {
  try {
    const data = await Note.findOneAndRemove({
      _id: req.params.id,
      trash: true,
      userId: req.body.userId
    });
    if (data) {
      updateRedis(req.body.userId)
      logger.info(`Note From Trash Deleted For ${req.params.id}`)
      return data;
    } else {
      logger.info(`Note From Trash Deleted Failed For ${req.params.id}`)
      throw new Error("error:Note Doesn't Exist In Trash");
    }
  } catch (err) {
    logger.info(`Note From Trash Deleted Failed For ${req.params.id}`)
    throw new Error(err);
  }
};



export const findArchivedNote = async (req) => {
  try {
    const data = await Note.findOne({
      _id: req.params.id,
      trash: false,
      archive: true,
      userId: req.body.userId
    });
    if (data) {
      updateRedis()
      logger.info(`Note Archived Fetched Successful For ${req.params.id}`)
      return data;
    } else {
      logger.info(`Note Archived Fetched Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.info(`Note Archived Fetched Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

export const updateNoteArchiveStatus = async (req) => {
  try {
    const filter = { _id: req.params.id, userId: req.body.userId, new: true };
    const archivedNote = await Note.findOne({
      _id: req.params.id,
      userId: req.body.userId
    });
    const update = { archive: !archivedNote.archive };
    const data = await Note.findByIdAndUpdate(filter, update);
    if (data) {
      updateRedis(req.body.userId)
      logger.error(`Note Archived By Id For ${req.params.id}`)
      return data;
    } else {
      logger.error(`Note Archived By Id Failed For ${req.params.id}`)
      throw new Error('error:Database Operation Failed')
    }
  } catch (err) {
    logger.error(`Note Archived By Id Failed For ${req.params.id}`)
    throw new Error(err);
  }
};

const updateRedis = async (userId) => {
  await client.HDEL(userId,'userData')
}

