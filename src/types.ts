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

interface TMessage {
    subject: string;
    message_body: string;
    status: 'sent' | 'read';
}
export interface TUserMessage {
    user_id: number;
    full_name: string;
    email: string;
    messages: TMessage[];
}

interface TRequest {
    requested_survey_title: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface TUserPartnerRequest {
    user_id: number;
    full_name: string;
    email: string;
    partner: TPartner | null;
    clientRequests: TRequest[];
}

interface TSupport {
    subject: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    resolved_by: number | null;
    resolved_at: string | null;
}

export interface TUserSupport {
    user_id: number;
    full_name: string;
    email: string;
    userSupportTickets: TSupport[];
}

interface TQuiz {
    question_text: string;
    question_type: 'text'| 'multiple_choice'| 'rating'| 'boolean';
}

export interface TSurveyQuiz {
    title: string;
    description: string;
    status: 'active'| 'inactive' | null;
    reward: string;
    questions: TQuiz[];
}
