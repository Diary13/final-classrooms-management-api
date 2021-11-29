import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    readonly mail: string;
    @ApiProperty()
    readonly password: string;
}