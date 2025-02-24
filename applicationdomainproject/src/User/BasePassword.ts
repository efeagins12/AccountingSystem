class BasePassword {
    private password: string = "password";
    private previousPasswords: string[] = [];
    public createdAt: Date | undefined;
    public expireOn: Date | undefined;
    regex = new RegExp('.+\\*.+');



    constructor(
        password: string,
    ) {
        this.password = password;
        this.createdAt = new Date();
    }
    public GetPassword() {
        return this.password;
    }
    public changePassword(newPassword: string): boolean {
        if (this.IsPreviousPassword(newPassword)) {
            console.warn("Cannot reuse an old password.");
            return false;
        }

        // check password length
        if (this.password.length < 8) {
            console.warn("Password must be at least 8 characters long.");
            return false;
        }

        // checks password for a number
        this.regex = new RegExp('^[1-9]d{0,2}$')
        if (!this.regex.test(this.password)) {
            console.warn("Password must contain a number");
            return false;
        }

        // checks password for a letter
        this.regex = new RegExp(/[a-zA-Z]/g);
        if (!this.regex.test(this.password)) {
            console.warn("Password must contain a letter");
            return false;
        }
        // makes sure password starts with letter
        if (!this.regex.test(this.password[0])) {
            console.warn("Password must start with a letter");
            return false;
        }

        // check for special character
        this.regex = new RegExp(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/);
        if (!this.regex.test(this.password)) {
            console.warn("Password must contain a special character");
            return false;
        }

        this.previousPasswords.push(this.password); // Store the old password
        this.password = newPassword;
        return true;
    }
    public IsPassword(value: string) : boolean {
        return this.password === value;
    }
    public IsPreviousPassword(value: string): boolean  {
        return (this.previousPasswords.includes(value));
    }
    public AddPreviousPassword(value: string) : void {
        if (!this.previousPasswords) {
            this.previousPasswords = [];
        }
        this.previousPasswords.push(value);
    }
    public setExpiration(days: number = 90): void {
        this.expireOn = new Date();
        this.expireOn.setDate(this.expireOn.getDate() + days);
    }

    /** Check if the password is expired */
    public isExpired(): boolean {
        return this.expireOn ? new Date() > this.expireOn : false;
    }

}

export default BasePassword;