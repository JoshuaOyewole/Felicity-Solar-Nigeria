//import { Mail, MailCheck } from 'lucide-react'


const testimonials = [
    {
        "name": "Mr. Adeola I.",
        "location": "Lagos State, Nigeria",
        "img": "https://images.pexels.com/photos/5398958/pexels-photo-5398958.jpeg",
        "message": "witching to Felicity Solar was the best decision for my business. Our power costs have dropped by over 60%, and the solar battery performance is unmatched. Reliable products, top-notch support!"
    },
    {
        "name": "Tunde A.",
        "location": "Abuja, Nigeria",
        "img": "https://images.pexels.com/photos/936117/pexels-photo-936117.jpeg",
        "message": "We’ve had constant power since installing Felicity Solar's panels and inverter system. The installation was seamless, and the team was incredibly professional. I finally enjoy peace of mind!"
    },
    {
        "name": "Dominic E.",
        "location": "Edo State, Nigeria",
        "img": "https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg",
        "message": "Felicity Solar provided our community with solar floor lights and battery storage, and it has transformed our nights—no more darkness or security concerns. Their products are built to last."
    },
    {
        "name": "Engr. Boma K.",
        "location": "CareMed Hospital",
        "img": "https://img.freepik.com/premium-photo/portrait-african-american-man-as-software-engineer-looking-camera-while-posing-workplace-wi_236854-44703.jpg",
        "message": "Our hospital switched to Felicity Solar’s solar charge controllers and backup systems. Even during outages, we stay powered. Their technology is efficient and dependable—truly life-saving."
    },
    {
        "name": "Ola O.",
        "location": "StackDev Limited",
        "img": "https://www.shutterstock.com/image-photo/portrait-african-american-man-architect-600nw-1665468736.jpg",
        "message": "As a startup founder working remotely, power stability is critical. Felicity Solar’s inverter and battery combo has been flawless. I’ve recommended them to my entire tech circle."
    },
    {
        "name": "Grace N.",
        "location": "Program Director, EduLight Africa",
        "img": "https://everygirlafrica.org/wp-content/uploads/2022/03/first_african_woman_5f572eac88260.jpeg",
        "message": "We installed Felicity Solar panels and lights across five rural schools. The impact has been incredible—students now study after dark, and teachers feel safer. Quality meets purpose."
    },
    {
        "name": "Chijioke M.",
        "location": "MD, GreenHaven Properties",
        "img": "https://media.istockphoto.com/id/1366582232/photo/shot-of-a-mature-businessman-using-his-smartphone-to-send-a-text-message-while-drinking-coffee.jpg?s=612x612&w=0&k=20&c=o9XK4P6iW1drP9DBdGRXO-Pf9JhhH-R8nTco9WbTtlg=",
        "message": "Felicity Solar has been our go-to partner for solar solutions across all our residential projects. Their solar panels and inverters are highly efficient, and clients love the cost savings. It’s a win-win!"
    }
]

const products = [
    {
        title: "FL-SCCM12048 Li 120A MPPT 12V24V48 system (lithium battery wake up function)",
        category: "Solar Battery",
        id: "1",
        price: "208000"
    },
    {
        title: "FL-SCCM12048 Li 120A MPPT 12V24V48 system (lithium battery wake up function)",
        category: "Solar Battery",
        id: "2",
        price: "208000"
    },
    {
        title: "FL-15003 150W Floor Light with 45W Panel", category: "Solar Floor light",
        id: "3",
        price: "10600"
    },
    {
        title: "FL-M-450W Mono Panel",
        category: "Solar Battery",
        id: "4",
        price: "18200"
    },
    {
        title: "FL-SCCM12048 Li 120A MPPT 12V24V48 system (lithium battery wake up function)",
        category: "Solar Battery",
        id: "5",
        price: "208000"
    },
    {
        title: "FL-SCCM4524 Li 45A MPPT 12V24V system (lithium battery wake up function)",
        price: "119000",
        category: "Solar Battery",
        id: "6"
    }
]
const milestones = [
      {
        cover: "/assets/images/2007.png",
        msg: "Felicity Solar was founded in 2007 in Guangzhou."
    },
    {
        cover: "/assets/images/2008.png",
        msg: "We have our own factory and started manufacturing"
    },
    {
        cover: "/assets/images/2009.png",
        msg: "We started manufacturing battery, solar street light, solar charge controller, and inverter"
    }
    ,
    {
        cover: "/assets/images/2010.png",
        msg: "We had 3 shops and 22 salesman"
    },
    {
        cover: "/assets/images/2011_2012.png",
        msg: "We focused on power solar system"
    },
    {
        cover: "/assets/images/2013.png",
        msg: "We sold 500 thousand dollars of products"
    },
    {
        cover: "/assets/images/2016.png",
        msg: "We have set up a subsidiary in Nigeria, in order to provide better service directly."
    },
    {
        cover: "/assets/images/2018.png",
        msg: "Established Mali branch"
    },
    {
        cover: "/assets/images/2019.png",
        msg: "Established Congo, Cameroon, Burkina Faso branches"
    },
    {
        cover: "/assets/images/2020.png",
        msg: "Established Guinea, Kenya branches"
    },
    {
        cover: "/assets/images/2021.png",
        msg: "Completed 400 million sales and established 5 more branches"
    },
    {
        cover: "/assets/images/2022.png",
        msg: "Established South Africa, Germany, Netherlands, Philippines,Syria, and 4 more  branches"
    },
  /*   {
        cover: "/assets/images/2023.png",
        msg: "Established Thailand branch. New large factory relocation and more than 30 branches set up!"
    },
    {
        cover: "/assets/images/2024.png",
        msg: "Established 3 branches in South America and Europe. ."
    }, */
    {
        cover: "/assets/images/2025.png",
        msg: "Stay tuned for more glorious achievements from Felicity Solar.."
    },
]
const faq = [
    {
        "question": "What products does Felicity Solar Limited offer?",
        "answer": "Felicity Solar Limited specializes in high-quality solar solutions including solar panels, lithium and gel batteries, inverters, solar street lights, charge controllers, and complete solar power systems for residential, commercial, and industrial use."
    },
    {
        "question": "Does Felicity Solar offer installation services?",
        "answer": "Yes, we provide professional installation services through our certified technicians to ensure your solar system is safely and efficiently set up for maximum performance.."
    },
    {
        "question": "Are your solar products suitable for use in Nigeria and West Africa?",
        "answer": "Absolutely. All our products are designed and tested to perform optimally under the tropical climate conditions of Nigeria and other West African countries."
    },
    {
        "question": "Do your solar batteries come with a warranty?",
        "answer": "Yes, our solar batteries—both lithium and gel types—come with warranties ranging from 1 to 5 years depending on the model, ensuring you get value and peace of mind with every purchase."
    },
    {
        "question": "How can I place an order or request a quote?",
        "answer": "You can place an order or request a quote through our website’s contact form, by calling our customer service line, or by visiting any of our offices or authorized distributors."
    },
    {
        "question": "Do you offer after-sales support and maintenance?",
        "answer": "Yes, Felicity Solar is committed to customer satisfaction. We provide ongoing after-sales support, maintenance guidance, and technical assistance to help you get the most from your solar investment."
    },
]
const productsCats = [
    {
        value: "solar_panels",
        label: "Solar Panels"
    },
    {
        value: "batteries",
        label: "Batteries"
    },
    {
        value: "street_light",
        label: "Street lights"
    },
    {
        value: "inverters",
        label: "Inverters"
    },
    {
        value: "controllers",
        label: "Charge controllers"
    },
    {
        value: "floor_light",
        label: "Floor light"
    },
]
const nav_items = [{
    url: "/",
    label: "Home"
},
{
    url: "/about-us",
    label: "About us"
},
{
    url: "/products",
    label: "Products",
    children: [
        { label: "Solar Panels", url: "/products/solar-panels" },
        { label: "Inverters", url: "/products/inverters" },
        { label: "Batteries", url: "/products/batteries" },
        { label: "Street Lights", url: "/products/street-lights" },
    ],
},
/*
{
    url: "/find-installers",
    label: "Find Installers"
},
 {
    url: "/project-showcase",
    label: "Project show cases",
    children: [
        { label: "Solar Panels", url: "/products/solar-panels" },
        { label: "Inverters", url: "/products/inverters" },
        { label: "Batteries", url: "/products/batteries" },
        { label: "Street Lights", url: "/products/street-lights" },
    ],
}, */
{
    url: "/blog",
    label: "Blog"
},
{
    url: "/contact-us",
    label: "Contact us"
},
{
    url: "/after-sales",
    label: "After-Sales Service"
}
]

const installers = [
    {
        id: "1",
        city: "lagos",
        cover: "/assets/images/lagos.png",
        contact: {
            name: "Grace Johnson",
            email: "grace.johnson@gmail.com",
            phone: "+23470837383732",
            address: "24 Unity Road, Ikeja, Lagos State, Nigeria"
        }
    },
    {
        id: "2",
        city: "abuja",
        cover: "/assets/images/abuja.png",
        contact: {
            name: "Grace Johnson",
            email: "grace.johnson@gmail.com",
            phone: "+23470837383732",
            address: "24 Unity Road, Ikeja, Lagos State, Nigeria"
        }
    },
    {
        id: "3",
        city: "kano",
        cover: "/assets/images/kano.png",
        contact: {
            name: "Grace Johnson",
            email: "grace.johnson@gmail.com",
            phone: "+23470837383732",
            address: "24 Unity Road, Ikeja, Lagos State, Nigeria"
        }
    },

]

const products_nav_links = [
    {
        url: "/products/felicity-solar-panels",
        label: "Solar Panels"
    },
    {
        url: "/products/felicity-solar-batteries",
        label: "Batteries"
    },
    {
        url: "/products/felicity-solar-street-light",
        label: "Street Lights"
    }
    ,
    {
        url: "/products/felicity-solar-inverter",
        label: "Inverters"
    },
    {
        url: "/products/felicity-charge-controller",
        label: "Charge controller"
    },
    {
        url: "/products/felicity-solar-lights",
        label: "Solar Lights"
    }
]
const company_nav_links = [
    {
        url: "/about-us",
        label: "About us"
    },
    {
        url: "/project-showcase",
        label: "Project Showcase"
    },
    {
        url: "/blog",
        label: "Blog"
    }
    ,
    {
        url: "/contact-us",
        label: "Contact us"
    },
   /*  {
        url: "/find-installers",
        label: "Find Installers"
    }, */
    {
        url: "/after-sales",
        label: "After-Sales Service"
    },
    {
        url: "/privacy-policy",
        label: "Privacy Policy"
    },
    {
        url: "/terms-of-service",
        label: "Terms of Service"
    }
]

const blogs = [
    {
        title: "Africa's most outstanding solar power company of the year 2024",
        cover: "/assets/images/award1.jpg",
        category: "Annoucement"
    },
    {
        title: "Felicity Solar Announces Construction of 3rd Plant.",
        cover: "/assets/images/3rd_plant.jpg",
        category: "Annoucement"
    },
    {
        title: "Full Loading Production Line of Felicity Solar",
        cover: "/assets/images/production_line.jpg",
        category: "Annoucement"
    }
]

const why_choose_us = [
    {
        icon: "/assets/images/why_choose_us_icon.png",
        title: "Global Expertise",
        description: "17 years of global & Africa experience in provision of cutting edge Solar technology for both private and commercial clients."
    },
    {
        icon: "/assets/images/why_choose_us_icon.png",
        title: "Quality Products",
        description: "Our experienced engineers follow strict safety and quality control standards, ensuring that your solar project is completed to the highest quality standards."
    },
    {
        icon: "/assets/images/why_choose_us_icon.png",
        title: "Service Warranty",
        description: "All our installations and products comes with 12–60 Months warranty. Also, optional service warranty available on request."
    },
    {
        icon: "/assets/images/why_choose_us_icon.png",
        title: "Wide Distribution Network",
        description: "With presence in over 25 African countries, our products and support services are easily accessible wherever you are."
    }
]

const articles = [
    {
        title: "Africa’s Most Outstanding Solar Power Company of the Year 2024",
        category: "Awards",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "africas-most-outstanding-solar-power-company-2024"
    },
    {
        title: "New Range of Lithium Batteries Now Available",
        category: "product",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "new-range-of-lithium-batteries-now-available"
    },
    {
        title: "Felicity Solar Sponsors National Renewable Energy Conference",
        category: "event",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "felicity-solar-sponsors-national-renewable-energy-conference"
    },
    {
        title: "Solar Installation Training Now Open to Technicians",
        category: "training",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "solar-installation-training-open-to-technicians"
    },
    {
        title: "Maintenance Tips for Your Solar Panels",
        category: "tips",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "maintenance-tips-for-solar-panels"
    },
    {
        title: "Why More Homes are Choosing Felicity Solar",
        category: "insight",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "why-more-homes-choose-felicity-solar"
    },
    {
        title: "Solar Street Light Projects Completed in 5 States",
        category: "project",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "solar-street-light-projects-5-states"
    },
    {
        title: "Felicity Solar Launches Smart Inverter Series",
        category: "product",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "felicity-solar-smart-inverter-series"
    },
    {
        title: "How Solar is Empowering Women in Rural Areas",
        category: "impact",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "solar-empowering-women-rural-areas"
    },
    {
        title: "Office Holiday Closure Notice",
        category: "announcement",
        image: "/assets/images/blog_placeholder_image.png",
        slug: "office-holiday-closure-notice"
    }
];
const cities = [
    {
        name: "Lagos",
        logo: "/assets/images/lagos_logo.png",
        path: "/project-showcase/state/24"
    },
    {
        name: "Abuja",
        logo: "/assets/images/abuja_logo.png",
        path: "/project-showcase/state/37"
    },
    {
        name: "Kano",
        logo: "/assets/images/kano_logo.png",
        path: "/project-showcase/state/19"
    },
]

export { testimonials, faq, productsCats, nav_items, company_nav_links, products_nav_links, blogs, milestones, why_choose_us, articles, products, installers, cities }

