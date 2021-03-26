import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsInt, IsString } from 'class-validator';


export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsInt()
    readonly id: string;

    @IsString()
    readonly description: string;

    @IsInt()
    readonly index: number;

    @IsBoolean()
    readonly isCompleted: boolean
}
