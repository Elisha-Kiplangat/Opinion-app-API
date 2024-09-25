interface TUser {
    user_id: number;
    full_name: string;
    email: string;
}

interface TPartner {
    company_name: string;
    company_email: string;
    company_address: string;
    company_contact: string;
    user: TUser;
}

export type TUserPartner = TPartner | null;
