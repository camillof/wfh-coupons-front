import { environment } from '../../../../environments/environment';
import { User } from '../../admins/users/user';

export const COUPONS_BASIC_URL = environment.apiDir + 'coupons/';

enum Status {
    pending = 'pending',
    approved = 'approved',
    rejected = 'rejected'
}

export class Coupon {
    static readonly STATUSES = Status;

    id: number;
    user_id: number;
    requested_date: Date;
    status: Status;
    approved_date: Date;
    created_at: Date;
    user: User;

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.created_at = new Date();
    }
}

export class CouponFilteringParams {
    by_month: Number;
    by_status: Status;
    by_user_id: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}