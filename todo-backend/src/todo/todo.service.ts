import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>,) {
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(taskId: string): Promise<Todo> {
    const task = await this.todoModel.findById(taskId).exec();
    return task;
  }

  async update(taskId: string, updateTodoDto: UpdateTodoDto) {
    const editedTask = await this.todoModel
      .findByIdAndUpdate(taskId, updateTodoDto, { new: true });
    return editedTask;
  }

  async remove(taskId: string): Promise<any> {
    const deletedTask = await this.todoModel.findByIdAndRemove(taskId)
    return deletedTask;
  }
}
