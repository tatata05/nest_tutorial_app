import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('todo')
export class TodoController {
  constructor(private prisma: PrismaService) {}

  @Get('')
  getAll() {
    return [
      {
        test: '一覧を取得',
      },
    ];
  }

  @Get('list')
  async getList() {
    const result = await this.prisma.task.findMany({
      where: {
        is_done: false,
      },
    });
    return [...result];
  }

  @Post('')
  async add(@Body() task: CreateTaskDto) {
    await this.prisma.task.create({
      data: task,
    });
    return {
      status: 'ok',
    };
  }

  @Put(':id/done')
  async done(@Param() param: UpdateTaskDto) {
    await this.prisma.task.update({
      data: {
        is_done: true,
      },
      where: {
        id: param.id,
      },
    });
    return {
      status: 'OK',
    };
  }
}
