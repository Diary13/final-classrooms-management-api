import { ApiProperty } from "@nestjs/swagger";

export class UpdatePersonalsDto {
    @ApiProperty({ required: false })
    readonly name?: string;
    @ApiProperty({ required: false })
    readonly mail?: string;
    @ApiProperty({ required: false })
    readonly password?: string;
    @ApiProperty({ format: 'binary', required: false })
    photo?: string;
    @ApiProperty({ required: false })
    readonly isAdmin?: boolean;//admin ou ...
    @ApiProperty({ required: false })
    readonly post?: string;// prof ou ...
}