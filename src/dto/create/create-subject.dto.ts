import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    branch: string;
    @ApiProperty()
    prof: string;
}