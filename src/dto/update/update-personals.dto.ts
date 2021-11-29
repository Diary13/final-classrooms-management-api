import { ApiProperty } from "@nestjs/swagger";

export class UpdatePersonalsDto {
    @ApiProperty()
    readonly name?: string;
    @ApiProperty()
    readonly mail?: string;
    @ApiProperty()
    readonly password?: string;
    @ApiProperty()
    readonly photo: string;
    @ApiProperty()
    readonly isAdmin?: boolean;//admin ou ...
    @ApiProperty()
    readonly post?: string;// prof ou ...
}