import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    batiment: number;
    @ApiProperty()
    niveau: number;
    @ApiProperty()
    place_nb: number;
}