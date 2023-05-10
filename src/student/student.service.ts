import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDTO } from 'src/dto/createStudent.dto';
import { UpdateStudentDTO } from 'src/dto/updateStudent.dto';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {

    }

    // Creating a new student inside mongodb
    async createStudent(createStudentDTO: CreateStudentDTO): Promise<IStudent> {

        const newStudent = await new this.studentModel(createStudentDTO);
        return newStudent.save(); // save a new student
    }

    // reading all the students from mongodb
    async getAllStudents(): Promise<IStudent[]> {
        const studentData = await this.studentModel.find()
        if (!studentData || studentData.length == 0) {
            throw new NotFoundException("Student data not found");
        }
        return studentData
    }

    // get specific student by using ti's id
    async getStudent(studentId: string): Promise<IStudent> {
        const existingStudent = await this.studentModel.findById(studentId);

        if (!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`)
        }

        return existingStudent;
    }

    // delete a student by using it's id
    async deleteStudent(studentId: string): Promise<IStudent> {
        const deleteStudent = await this.studentModel.findByIdAndDelete(studentId);
        if (!deleteStudent) {
            throw new NotFoundException(`Student #${studentId} not found`)
        }
        return deleteStudent;
    }

    // update a student by using id
    async updateStudent(studentId: string, updateStudentDTO: UpdateStudentDTO): Promise<IStudent> {

        let existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDTO, { new: true })
        if (!existingStudent) {
            throw new NotFoundException(`Student #${studentId} not found`)
        }
        return existingStudent;

    }
}
