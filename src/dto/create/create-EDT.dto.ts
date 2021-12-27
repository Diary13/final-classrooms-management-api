import { ApiProperty } from "@nestjs/swagger";

export class hourEDT {
    @ApiProperty()
    subject: string;
    @ApiProperty()
    room: string;
}
export class dayEDT {
    @ApiProperty()
    h1?: hourEDT;
    @ApiProperty()
    h2?: hourEDT;
    @ApiProperty()
    h3?: hourEDT;
    @ApiProperty()
    h4?: hourEDT;
}

export class CreateEDTDto {
    @ApiProperty()
    M?: dayEDT;
    @ApiProperty()
    T?: dayEDT;
    @ApiProperty()
    W?: dayEDT;
    @ApiProperty()
    H?: dayEDT;
    @ApiProperty()
    F?: dayEDT;
    @ApiProperty()
    S?: dayEDT;
    @ApiProperty()
    branch: string;
}