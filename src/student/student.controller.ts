import { Controller, Post, Res, Body, HttpStatus, Get, Put, Delete, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from 'src/dto/createStudent.dto';
import { response } from 'express';
import { UpdateStudentDTO } from 'src/dto/updateStudent.dto';

@Controller('student')
export class StudentController {
    
    constructor(private readonly studentService: StudentService) {}

    @Post()
    async createStudent(@Res() response, @Body() createStudentDTO: CreateStudentDTO) {
        try {

            const newStudent = await this.studentService.createStudent(createStudentDTO);
            return response.status(HttpStatus.CREATED).json({
                message: "Student has been created successfully",
                newStudent
            })

        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error Student not created",
                error: "Bad Request"
            })
        }
    }

    @Get()
    async getStudents(@Res() response) {
        try {

            const studentData = await this.studentService.getAllStudents()
            return response.status(HttpStatus.OK).json({
                message: "All Student Data",
                studentData

            })

        } catch (err) {
            return response.status(err.status).json(err.response);

        }
    }

    @Get("/:id")
    async getStudent(@Res() response, @Param("id") studentId: string) {
        try {

            const existingStudent = await this.studentService.getStudent(studentId);

            return response.status(HttpStatus.OK).json({ existingStudent })

        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Put("/:id")
    async updateStudent(@Res() response, @Param("id") studentId: string, @Body() updateStudent: UpdateStudentDTO) {
        try {

            const existingStudent = await this.studentService.updateStudent(studentId, updateStudent);
            return response.status(HttpStatus.OK).json({
                message: "Student has been successfully updated",
                existingStudent

            })

        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete("/:id")
    async deleteStudent(@Res() response, @Param("id") studentId: string) {
        try {

            const deleteStudent = await this.studentService.deleteStudent(studentId);

            return response.status(HttpStatus.OK).json({
                message: "Student has been successfully deleted",
                deleteStudent
            })

        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }



}
