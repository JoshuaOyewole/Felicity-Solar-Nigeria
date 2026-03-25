import { FieldError, UseFormRegister } from "react-hook-form";

export type AddProductFormData = {
    name: string;
    category: string;
    description: number;
    price: string;
    keyFeatures?: string;
    discount: string;
};

export type ISubmitOrder = {
    fullnames: string;
    product_name: string;
    product_id?: string;
    email: string;
    phone: string;
    qty?: string;
    additionalMessage?: string;
}
export type ISendQuote = {
    fullnames: string,
    email: string,
    location?: string,
    budget_range: string,
    notes?: string
}

export type ICreateQuery = {
    firstname: string,
    lastname?: string,
    email: string,
    phone?: string,
    message: string
}
export type ICreateProduct = {
    product_name?: string;
    category_id?: string;
    description?: string;
    price?: string;
    total_stock?: string,
    key_features?: string;
    discount_rate?: string;
    image_1: string;
    image_2: string;
    image_3: string;
    image_4?: string | null;
    video_link?: string | null;
    id?: string
}
export type ICreateArticle = {
    title?: string;
    category: string;
    content?: string;
    thumbnail: string;
    id?: string
}
export type ICreateProjectShowcase = {
    title?: string;
    state?: string;
    content?: string;
    thumbnail: string;
    id?: string,
    projectState?: string
}


export type IContactDetails = {
    phone: string,
    email: string,
    id?: string,
    address: string
}
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<AddProductFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};


export type ValidFieldNames =
    | "name"
    | "category"
    | "description"
    | "price"
    | "keyFeatures"
    | "discount";