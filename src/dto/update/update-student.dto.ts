import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly mail?: string;
    @ApiProperty()
    readonly password?: string;
    @ApiProperty({ format: 'binary', required: false })
    photo?: string;
    @ApiProperty()
    readonly branch?: string;
}