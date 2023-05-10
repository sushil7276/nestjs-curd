import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDTO } from "./createStudent.dto";

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {

}