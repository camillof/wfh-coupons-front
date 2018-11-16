import { environment } from "src/environments/environment";

enum Roles {
    user = 'user',
    admin = 'admin'
}

export const USERS_BASIC_URL = environment.apiDir + 'users/';
export const INVITATION_BASE_URL = environment.apiDir + 'invitations/';

export class User {
    static ROLES = Roles;

    id: number;
    name: string;
    role: Roles;
    active: boolean;
    email: string;

    constructor(values: Object = {}) { 
        Object.assign(this, values);
    }
    
    get isAdmin() {
        return this.role === Roles.admin;
    }

    set isAdmin(value: boolean) {
        value ? this.role = Roles.admin : this.role = Roles.user;
    }
}

export class Invitation {
    invitation: {
        email: string,
        name: string,
        role: Roles
    };
    constructor(email: string, name: string, role: Roles) {
        this.invitation = { email: email, name: name, role: role };
    }
}