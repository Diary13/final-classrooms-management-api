export class hourEDT {
    subject: string;
    room: string;
}
export class dayEDT {
    h1?: hourEDT;
    h2?: hourEDT;
    h3?: hourEDT;
    h4?: hourEDT;
}

export class CreateEDTDto {
    M?: dayEDT;
    T?: dayEDT;
    W?: dayEDT;
    H?: dayEDT;
    F?: dayEDT;
    S?: dayEDT;
}