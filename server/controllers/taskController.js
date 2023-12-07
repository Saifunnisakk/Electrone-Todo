import TaskService from "../service/taskService.js";
import taskValidation from "../validation/taskValidation.js";

export const createTask = async (req, res) => {
  try {
    const { error } = taskValidation.validate(req.body, {
      allowUnknown: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ error: error.details[0].message, data: null });
    }
    const task = await TaskService.createTask(req.body);
    return res.status(200).json({ error: null, data: task });
  } catch (e) {
    return res.status(500).json({ error: e, data: null });
  }
};

export const getTask = async (req, res) => {
  try {
    const tasks = await TaskService.getTask();
    res.status(200).json({ error: null, data: tasks });
  } catch (e) {
    res.status(500).json({ error: e, data: null });
    console.log(e);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await TaskService.updateTask(req.params.id, req.body);
    res.status(200).json({ error: null, data: task });
  } catch (error) {
    res.status(500).json({ error: error, data: null });
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await TaskService.deleteTask(req.params.id);
    res.status(200).json({ error: null, data: null });
  } catch (error) {
    res.status(500).json({ error: error, data: null });
    console.log(error);
  }
};
