import { z } from "zod";

const AddBlogSchema = z.object({
    title: z.string().min(1, 'Product name is required'),
    category: z.string().min(1, 'Category is required'),
    //content: z.string().min(1, 'content is required'),
    thumbnail: z.string().min(1, ' required')
});
const AddProjectSchema = z.object({
    title: z.string().min(1, 'Product name is required'),
    state: z.string().min(1, 'state is required'),
    //content: z.string().min(1, 'content is required'),
    thumbnail: z.string().min(1, ' required')
});
const ContactDetailsSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    address: z.string().min(1, 'Address is required'),
    //content: z.string().min(1, 'content is required'),
    phone: z.string().min(1, ' required')
});
const AddProductSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    category: z.string().min(1, 'Category is required'),
    // description: z.string().min(1, 'description is required'),
    price: z.string().min(1, 'Price is required'),
    discount: z.string().min(1, 'Discount is required'),
    thumbnail1: z.string().min(1, ' required'),
    thumbnail2: z.string().min(1, ' required'),
    thumbnail3: z.string().min(1, 'required'),
    thumbnail4: z.string().optional().nullable(),
    videoLink: z.string().optional().or(z.literal("")),
    //thumbnail5: z.string().optional(),
    //keyFeatures: z.string().optional(),
});
const EditProductSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.string().min(1, 'Price is required'),
    discount: z.string().min(1, 'Discount is required'),
    thumbnail1: z.string().min(1, ' required'),
    thumbnail2: z.string().min(1, ' required'),
    thumbnail3: z.string().min(1, 'required'),
    thumbnail4: z.string().optional().nullable(),
    videoLink: z.string().optional().or(z.literal("")).or(z.null()),
    //thumbnail5: z.string().optional(),
    // Note: description and keyFeatures are handled separately by SimpleEditor components
});

const AddQuerySchema = z.object({
    firstname: z.string().min(1, 'required'),
    lastname: z.string().optional(),
    email: z.string().min(1, ' required'),
    phone: z.string().optional(),
    message: z.string().min(1, ' required'),
});
const OrderProductSchema = z.object({
    fullnames: z.string({errorMap: () => ({ message: 'Fullnames is required' })}).min(5, 'Fullnames must be at least 5 characters'),
    product_name: z.string({errorMap: () => ({ message: 'Product name is required' })}).min(5, 'Product name must be at least 5 characters'),
    product_id: z.string().optional(),
    email: z.string().min(6, 'Email is required'),
    phone: z.string().min(10, 'Phone number is required'),
    qty: z.string().optional(),
    additionalMessage: z.string().optional()
});

const LoginSchema = z.object({
    email: z.string().min(5, 'Email is required'),
    password: z.string().min(5, 'Email is required'),
})

const SendQuoteSchema = z.object({
    fullnames: z.string().min(3, 'Fullnames is required'),
    email: z.string().min(5, 'Email is required'),
    location: z.string().min(1, 'Location is required'),
    budget_range: z.string().min(5, 'Must be more than 5 characters'),
    notes: z.string().optional()
})
export { LoginSchema, AddProductSchema, ContactDetailsSchema, AddBlogSchema, SendQuoteSchema, OrderProductSchema, AddProjectSchema, EditProductSchema, AddQuerySchema }