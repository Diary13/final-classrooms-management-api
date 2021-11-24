import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly mail?: string;
    @ApiProperty()
    readonly photo: string;
    @ApiProperty()
    readonly branch?: string;
}