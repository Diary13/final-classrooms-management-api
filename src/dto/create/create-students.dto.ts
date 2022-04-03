import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    password: string;
    @ApiProperty({ format: 'binary', required: false })
    photo?: string;
    @ApiProperty()
    branch: string;
}