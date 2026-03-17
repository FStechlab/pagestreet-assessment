import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/in/create-employee.dto';
import { UpdateEmployeeDto } from './dto/in/update-employee.dto';
import { EmployeeOutDto } from './dto/out/employee.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeOutDto> {
    const created = await this.prisma.employee.create({
      data: createEmployeeDto,
    }).catch(err => {
      if (err.code === 'P2002') {
      throw new HttpException(
        'An employee with this email already exists',
        HttpStatus.CONFLICT,
      );
      }
      throw err;
    });

    return plainToClass(EmployeeOutDto, created);
  }

  async findAll(): Promise<EmployeeOutDto[]> {
    const employees = await this.prisma.employee.findMany();
    return employees.map(emp => plainToClass(EmployeeOutDto, emp));
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeOutDto> {
    const updated = await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    }).catch(err => {
      if (err.code === 'P2025') {
      throw new HttpException(
        `Employee with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
      }
      if (err.code === 'P2002') {
      throw new HttpException(
        'An employee with this email already exists',
        HttpStatus.CONFLICT,
      );
      }
      throw err;
    });
    return plainToClass(EmployeeOutDto, updated);
  }

  async remove(id: string): Promise<EmployeeOutDto> {
    const deleted = await this.prisma.employee.delete({
      where: { id },
    }).catch(err => {
      if (err.code === 'P2025') {
        throw new HttpException(
          `Employee with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw err;
    });
    return plainToClass(EmployeeOutDto, deleted);
  }
}
