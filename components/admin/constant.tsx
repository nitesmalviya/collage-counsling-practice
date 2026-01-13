import { UserRole } from "@/lib/types";
import {
    GraduationCap,
    Users,
    Shield,
    MessageSquare,
    BookOpen,
    Target,
    FileText,
    TrendingUp,
    Search,
    BarChart3,
    Video,
    Clock
    , Settings, Home, Calendar, Wallet
} from "lucide-react"

export const roleList = [
    {
      value: "student" as UserRole,
      label: "Student",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    // {
    //   value: "educator" as UserRole,
    //   label: "Educator / Counselor",
    //   icon: <Users className="w-4 h-4" />,
    // },
  ];
export const rolesData = [
    {
        role: "Student",
        icon: <GraduationCap className="w-6 h-6 text-primary" />,
        buttonText: "Start as Student",
        buttonLink: "/signup",
        features: [
            "Search and compare colleges",
            "Track all applications in one place",
            "Get essay feedback from experts",
            "Access test prep materials",
            "Calculate financial aid options",
        ],
        iconColor: "bg-primary",
        textColor: "text-primary",
        border: "",
    },
    {
        role: "Educator",
        icon: <Users className="w-6 h-6 text-primary" />,
        buttonText: "Start as Educator",
        buttonLink: "/signup",
        features: [
            "Manage your availability and bookings",
            "Conduct video sessions with students",
            "Share resources and materials",
            "Track earnings and payments",
            "Build your counseling practice",
        ],
        iconColor: "bg-secondary",
        textColor: "text-secondary",
        border: "border-primary",

    },
    {
        role: "Admin",
        icon: <Shield className="w-6 h-6 text-primary" />,
        buttonText: "Start as Admin",
        buttonLink: "/signup",
        features: [
            "Manage users and permissions",
            "Monitor platform analytics",
            "Process payments and refunds",
            "Generate detailed reports",
            "Configure platform settings",
        ],
        iconColor: "bg-accent",
        textColor: "text-accent",
        border: "",
    },
];
export const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Testimonials", href: "#" },
            { name: "FAQs", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
        ],
    },
];
export const cardData = [
    {
        title: "College Search & Match",
        description: "Discover colleges that match your profile, interests, and goals with our intelligent matching system.",
        icon: <Search className="w-6 h-6 text-primary" />,
    },
    {
        title: "Application Tracker",
        description: "Stay organized with deadline reminders, requirement checklists, and real-time application status tracking.",
        icon: <Target className="w-6 h-6 text-primary" />,
    },
    {
        title: "Essay Review & Editing",
        description: "Get expert feedback on your personal statements and supplemental essays from experienced counselors.",
        icon: <FileText className="w-6 h-6 text-primary" />,
    },
    {
        title: "Test Prep Resources",
        description: "Access SAT/ACT practice tests, study guides, and personalized prep plans to maximize your scores.",
        icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
        title: "1-on-1 Video Sessions",
        description: "Book personalized counseling sessions with expert advisors via secure video conferencing.",
        icon: <Video className="w-6 h-6 text-primary" />,
    },
    {
        title: "Financial Aid Calculator",
        description: "Estimate costs, explore scholarships, and plan your financial aid strategy with our comprehensive tools.",
        icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
    {
        title: "Profile Builder",
        description: "Create a comprehensive profile showcasing your GPA, test scores, activities, and achievements.",
        icon: <BarChart3 className="w-6 h-6 text-primary" />,
    },
    {
        title: "Timeline & Milestones",
        description: "Follow a personalized timeline with key milestones tailored to your grade level and goals.",
        icon: <Clock className="w-6 h-6 text-primary" />,
    },
    {
        title: "Real-Time Chat",
        description: "Stay connected with your counselors through instant messaging for quick questions and support.",
        icon: <MessageSquare className="w-6 h-6 text-primary" />,
    },
];

export const stepsData = [
    {
        number: 1,
        title: "Create Your Profile",
        description: "Sign up and build your student profile with your academic info, interests, and goals.",
    },
    {
        number: 2,
        title: "Find Your Counselor",
        description: "Browse expert counselors by specialty and book your first session with the perfect match.",
    },
    {
        number: 3,
        title: "Build Your Strategy",
        description: "Work with your counselor to create a personalized college application strategy and timeline.",
    },
    {
        number: 4,
        title: "Achieve Your Goals",
        description: "Track progress, submit applications, and get accepted to your dream schools!",
    },
];

export const pricingPlans = [
    {
        plan: "Starter",
        price: 29,
        frequency: "month",
        features: [
            "2 counseling sessions/month",
            "College search & matching",
            "Application tracker",
            "Basic resources",
        ],
        buttonText: "Get Started",
        buttonLink: "/signup",
        isPopular: false,
        iconColor: "bg-primary",
        textColor: "text-primary",
    },
    {
        plan: "Professional",
        price: 79,
        frequency: "month",
        features: [
            "6 counseling sessions/month",
            "Everything in Starter",
            "Essay review & editing",
            "Test prep materials",
            "Priority support",
        ],
        buttonText: "Get Started",
        buttonLink: "/signup",
        isPopular: true,
        iconColor: "bg-primary",
        textColor: "text-primary",
    },
    {
        plan: "Premium",
        price: 149,
        frequency: "month",
        features: [
            "Unlimited sessions",
            "Everything in Professional",
            "Dedicated counselor",
            "Parent portal access",
            "24/7 support",
        ],
        buttonText: "Get Started",
        buttonLink: "/signup",
        isPopular: false,
        iconColor: "bg-accent",
        textColor: "text-accent",
    },
];
export const testimonials = [
    {
        name: "Emma Wilson",
        initials: "EW",
        school: "Stanford University '29",
        testimonial: "Pathfinder helped me get into Stanford! The essay review sessions were invaluable, and my counselor guided me through every step of the process.",
        rating: 5,
    },
    {
        name: "James Smith",
        initials: "JS",
        school: "Harvard University '29",
        testimonial: "The test prep resources boosted my SAT score by 240 points! I couldn't have done it without the personalized study plan and practice materials.",
        rating: 5,
    },
    {
        name: "Sophia Lee",
        initials: "SL",
        school: "Columbia University '29",
        testimonial: "The application tracker kept me organized and on top of all my deadlines. I got accepted to all 8 schools I applied to!",
        rating: 5,
    },
];

export const studentNavItems = [
    { href: "/student/dashboard", label: "Dashboard", icon: Home },
    { href: "/student/sessions", label: "Sessions", icon: Calendar },
    { href: "/student/chat", label: "Chat", icon: MessageSquare },
    { href: "/student/wallet", label: "Wallet", icon: Wallet },
    { href: "/student/resources", label: "Resources", icon: BookOpen },
    { href: "/student/faq", label: "FAQs", icon: FileText }, // Added FAQ for students
]
export const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Users", icon: Users },
    // { href: "/admin/payments", label: "Payments", icon: DollarSign },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 }, // Added Analytics for admin
    { href: "/admin/resources", label: "Resources", icon: BookOpen },
    { href: "/admin/settings", label: "Settings", icon: Settings },
]
export const educatorNavItems = [
    { href: "/educator/dashboard", label: "Dashboard", icon: Home },
    { href: "/educator/sessions", label: "Sessions", icon: Calendar },
    { href: "/educator/chat", label: "Chat", icon: MessageSquare },
    { href: "/educator/availability", label: "Availability", icon: Clock },
    { href: "/educator/faq", label: "FAQs", icon: FileText }, // Added FAQ for educators
]
export const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

export const DEFAULT_TIMEZONE = "PST";

// User creation modal messages
export const USER_CREATION_MESSAGES = {
  // Dialog
  DIALOG_TITLE: "Create an User",
  DIALOG_DESCRIPTION: "Get started with Pathfinder today",
  
  // Role selection
  ROLE_SELECTION_LABEL: "I am a...",
  ROLE_STUDENT: "Student",
  ROLE_EDUCATOR: "Educator",
  
  // Form labels
  LABEL_FIRST_NAME: "First Name",
  LABEL_LAST_NAME: "Last Name",
  LABEL_EMAIL: "Email",
  LABEL_PASSWORD: "Password",
  
  // Placeholders
  PLACEHOLDER_FIRST_NAME: "Enter your first name",
  PLACEHOLDER_LAST_NAME: "Enter your last name",
  PLACEHOLDER_EMAIL: "Enter your email",
  PLACEHOLDER_PASSWORD: "Enter your password",
  
  // Validation messages
  VALIDATION_PASSWORD_STRONG: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
  
  // Toast messages
  TOAST_SUCCESS_TITLE: "Account created!",
  TOAST_SUCCESS_DESCRIPTION: "User has been successfully created.",
  TOAST_ERROR_TITLE: "Signup failed",
  TOAST_ERROR_DESCRIPTION: "Something went wrong. Please try again.",
  
  // Button text
  BUTTON_CREATE_ACCOUNT: "Create account",
  BUTTON_CREATING_ACCOUNT: "Creating account...",
} as const;

export const adminRoleList = [
  {
    value: "student" as UserRole,
    label: USER_CREATION_MESSAGES.ROLE_STUDENT,
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    value: "educator" as UserRole,
    label: USER_CREATION_MESSAGES.ROLE_EDUCATOR,
    icon: <Users className="w-4 h-4" />,
  },
];
