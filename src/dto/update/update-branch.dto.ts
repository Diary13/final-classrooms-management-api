import { ApiProperty } from "@nestjs/swagger";

export class UpdateBranchDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly effectif?: number;
    @ApiProperty()
    readonly department?: string;
}