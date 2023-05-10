import { Document } from "mongoose";

export interface IStudent extends Document {
    readonly name: string;
    readonly rollNumber: string;
    readonly class: number;
    readonly gender: string;
    readonly marks: number;
}