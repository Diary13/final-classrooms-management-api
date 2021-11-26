import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoomsDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly batiment?: number;
    @ApiProperty()
    readonly niveau?: number;
    @ApiProperty()
    readonly place_nb?: number;
}