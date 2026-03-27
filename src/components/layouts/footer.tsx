import FooterClient from "./FooterClient";

export type IFooterData = {
    "id": number,
    "phone": string,
    "email": string,
    "address": string,
    "created_at": string,
    "updated_at": string
}

async function Footer() {
    const currentYear = new Date().getFullYear();
    let details: IFooterData | null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/contact-details`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error('Failed to fetch contact details');

        const response: {
            data: IFooterData;
            message: string;
            status: number;
        } = await res.json();

        details = response.data;
    } catch (error) {
        console.error('Error fetching contact details:', error);
    }

    return <FooterClient details={details} currentYear={currentYear} />;
}

export default Footer
