import Task from "../models/taskModel.js";

export default class taskService {
  static async createTask(data) {
    return Task.create(data);
  }

  static async getTask() {
    return Task.find();
  }

  static async updateTask(id, data) {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteTask(taskId) {
    return Task.findByIdAndDelete(taskId);
  }
}
