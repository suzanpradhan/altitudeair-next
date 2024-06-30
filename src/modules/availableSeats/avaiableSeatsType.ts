import { PackagesDataType } from "../packages/packagesType";

export interface AvailableSeatsDataType {
    id: number;
    package: PackagesDataType;
    date: string;
    seats: number;
}