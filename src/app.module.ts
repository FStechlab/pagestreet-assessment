import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { TaskModule } from './task/task.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [EmployeeModule, ConfigModule.forRoot({ isGlobal: true }), TaskModule],
})
export class AppModule {}
