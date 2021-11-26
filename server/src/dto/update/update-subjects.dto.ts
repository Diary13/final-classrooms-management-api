import { ApiProperty } from "@nestjs/swagger";

export class UpdateSubjectsDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly prof?: string;
    @ApiProperty()
    readonly branch?: string;
}