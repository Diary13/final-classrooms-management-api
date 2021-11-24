export class UpdatePersonalsDto {
    readonly name?: string;
    readonly mail?: string;
    readonly password?: string;
    readonly photo: string;
    readonly isAdmin?: boolean;//admin ou ...
    readonly post?: string;// prof ou ...
}