import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDto {
    @ApiProperty()
    name: string
}