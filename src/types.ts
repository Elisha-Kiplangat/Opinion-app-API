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
}

export interface TUserPartner {
    user_id: number;
    full_name: string;
    email: string;
    partner: TPartner | null;
}



interface TSurvey {
    title: string;
    status: "active" | "inactive" | null;
    reward: string;
}

interface TPayment {
    payment_status: "pending" | "completed" | "failed";
    transaction_id: string;
    payment_date: string | null;
    amount: string;
}

export interface TUserSurveyPayment {
    user_id: number;
    full_name: string;
    email: string;
    surveys: TSurvey[];
    payments: TPayment[];
}

