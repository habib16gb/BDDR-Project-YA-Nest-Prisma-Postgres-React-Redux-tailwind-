import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  async create({ name, id_manager }: CreateEmployeeDto) {
    try {
      const employee = await this.prisma.employee.create({
        data: { name, id_manager },
      });
      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Employee with name: ${name} already Exist, try again`,
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `manager with id: ${id_manager} not found, choose another one`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async findAll() {
    const employees = await this.prisma.employee.findMany();
    try {
      return employees;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee With id: ${id} not found`);
    }

    try {
      return employee;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, { name, id_manager }: UpdateEmployeeDto) {
    try {
      const employee = await this.prisma.employee.update({
        where: { id },
        data: { name, id_manager },
      });
      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `manager with id: ${id} not found, choose another one`,
          );
        }
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Employee with name: ${name} already Exist, try again`,
          );
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.employee.delete({ where: { id } });
      return `Employee with id: ${id} deleted success`;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`manager with id: ${id} not found`);
        }
      }
      throw new BadRequestException(
        `Error Code: ${error.code}\nError Message: ${error.message}`,
      );
    }
  }
}
