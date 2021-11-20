export class CreatePersonalsDto {
    name: string;
    mail: string;
    password: string;  
    photo?: string;
    isAdmin: boolean;//admin ou ...
    post: string;// prof ou ...
}