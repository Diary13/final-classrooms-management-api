import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    effectif: number;
    @ApiProperty()
    EDT: string;
}