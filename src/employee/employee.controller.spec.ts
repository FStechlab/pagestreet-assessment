import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/in/create-employee.dto';
import { UpdateEmployeeDto } from './dto/in/update-employee.dto';
import { EmployeeOutDto } from './dto/out/employee.dto';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create, read, update and delete an employee', async () => {
    const createEmployeeDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@exampleTESTUNIQUE2.com',
      role: 'Developer',
      department: 'Engineering',
    } as CreateEmployeeDto;

    const result: EmployeeOutDto = await controller.create(createEmployeeDto);
    expect(result).toHaveProperty('id');
    expect(result.firstName).toBe(createEmployeeDto.firstName);
    expect(result.lastName).toBe(createEmployeeDto.lastName);
    expect(result.email).toBe(createEmployeeDto.email);
    expect(result.role).toBe(createEmployeeDto.role);
    expect(result.department).toBe(createEmployeeDto.department);

    const findResult: EmployeeOutDto[] = await controller.findAll();
    expect(findResult).toHaveProperty('length');
    expect(findResult.length).toBeGreaterThan(0);
    expect(findResult.some(emp => emp.id === result.id)).toBe(true);

    const updateEmployeeDto = {
      firstName: 'Jane',
      lastName: 'Smith',
    } as UpdateEmployeeDto;

    const updateResult: EmployeeOutDto = await controller.update(result.id, updateEmployeeDto);
    expect(updateResult.firstName).toBe(updateEmployeeDto.firstName);
    expect(updateResult.lastName).toBe(updateEmployeeDto.lastName);

    const deleteResult = await controller.remove(result.id);
    expect(deleteResult).toHaveProperty('id');
    expect(deleteResult.id).toBe(result.id);
  });
});
