export interface Comment {
    _event: string;
    _creator: string | object;
    content: string;

    createdAt?: string;
    _id?: string;
    _v?: any;
}
