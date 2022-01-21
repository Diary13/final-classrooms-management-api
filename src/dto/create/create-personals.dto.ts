import { ApiProperty, ApiBody, ApiConsumes } from "@nestjs/swagger";

export class CreatePersonalsDto {

    @ApiProperty()
    name: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    password: string;
    @ApiProperty({ format: 'binary', required: false })
    photo?: string;
    @ApiProperty()
    isAdmin: boolean;//admin ou ...
    @ApiProperty()
    post: string;// prof ou ...
}