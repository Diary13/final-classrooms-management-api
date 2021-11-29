import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonalsDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    photo?: string;
    @ApiProperty()
    isAdmin: boolean;//admin ou ...
    @ApiProperty()
    post: string;// prof ou ...
}