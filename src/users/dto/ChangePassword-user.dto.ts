export class ChangePasswordDto {
    readonly email: string;
    readonly newPassword: string;
    readonly oldPassword: string;
}