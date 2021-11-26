import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    photo?: string;
    @ApiProperty()
    branch: string;
}