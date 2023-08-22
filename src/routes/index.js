import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() =>
    import ('../pages/Dashboard'))
const Forms = lazy(() =>
    import ('../pages/Forms'))
const Cards = lazy(() =>
    import ('../pages/Cards'))
const Charts = lazy(() =>
    import ('../pages/Charts'))
const Buttons = lazy(() =>
    import ('../pages/Buttons'))
const Modals = lazy(() =>
    import ('../pages/Modals'))
const Tables = lazy(() =>
    import ('../pages/Tables'))
const Page404 = lazy(() =>
    import ('../pages/404'))
const Blank = lazy(() =>
    import ('../pages/Blank'))

const Companylist = lazy(() =>
    import ('../pages/CompanyList'))
const CompanyDetail = lazy(() =>
    import ('../pages/companyDetail'))

const InvoiceDetailPage = lazy(() =>
    import ('../components/invoices/InvoiceDetailPage'))

const InvoiceList = lazy(() =>
    import ('../components/invoices/InvoiceList'))

const ContractList = lazy(() =>
    import ('../components/Contracts/ContractList'))
const ContractDetail = lazy(() =>
    import ('../components/Contracts/ContractDetail'))

const UnAuthorized = lazy(() =>
    import ('../components/UnAuthorized/UnAuthorized'))


const PgDetail = lazy(() =>
    import ('../components/newProjects/PGDetail'))

const PgList = lazy(() =>
    import ('../components/newProjects/PGList'))


const LeaveTypeList = lazy(() =>
    import ('../components/LeaveTypes/LeaveType'))
const LeaveList = lazy(() =>
    import ('../components/Leaves/LeaveList'))

const PayrollList = lazy(() =>
    import ('../components/payroll/PayrollList'))
const payrollDetail = lazy(() =>
    import ('../components/payroll/PayrollDetail'))

const LeaveDetail = lazy(() =>
    import ('../components/Leaves/LeaveDetail'))


const CandidateList = lazy(() =>
    import ('../components/Candidates/CandidatesList'))

const CandidateDetail = lazy(() =>
    import ('../components/Candidates/CandidatesDetail'))
const ShortListedCandidates = lazy(() =>
    import ('../components/Candidates/ShortListed'))
const SelectedCandidates = lazy(() =>
    import ('../components/Candidates/Selected'))
const BidsList = lazy(() =>
    import ('../pages/BidList'))
const BidDetail = lazy(() =>
    import ('../pages/BidDetail'))

const DepartmentList = lazy(() =>
    import ('../pages/DepartmentList'))
const DepartmentDetail = lazy(() =>
    import ('../pages/DepartmentDetail'))
const DesignationList = lazy(() =>
    import ('../pages/DesignationList'))
const DesignationDetail = lazy(() =>
    import ('../pages/DesignationDetail'))
const EmployeeList = lazy(() =>
        import ('../pages/EmployeeList'))
    // const EmployeeDetail = lazy(() =>
    //     import ('../pages/EmployeeDetail'))
const UsersList = lazy(() =>
    import ('../pages/UsersList'))
const UsersDetail = lazy(() =>
    import ('../pages/UsersDetail'))

const LetterRequests = lazy(() =>
    import ('../components/LetterRequest/LetterRequest')
)

const LetterRequestsDetail = lazy(() =>
    import ('../components/LetterRequest/LetterRequestDetail')
)

const Chat = lazy(() =>
    import ('../components/Chat/Chat'))
const Projects = lazy(() =>
    import ('../components/Projects/Projects')
)

const Messages = lazy(() =>
    import ('../components/Messages/Messages'))

const PaymentDetail = lazy(() =>
    import ('../components/payment/PaymentDetail'))

const EmployeeDetail = lazy(() =>
    import ('../pages/EmployeeDetail'))

const Timesheet = lazy(() =>
    import ('../components/Timesheet/Timesheet'))

const TimesheetDetail = lazy(() =>
    import ('../components/Timesheet/TimesheetDetail'))
const Settings = lazy(() =>
    import ('../components/Settings/Settings'))


// Owda routes
const OwdaAccountTypesList = lazy(() =>
    import ('../components/Finance/AccountTypeList'))

const owdaAccountTypeDetail = lazy(() =>
    import ('../components/Finance/AccountTypeDetail')
)

const owdaBankList = lazy(() =>
    import ('../components/Finance/BanksList'))

const owdaAccountList = lazy(() =>
    import ('../components/Finance/AccountsLists'))

const owdaDonorList = lazy(() =>
    import ('../components/Finance/DonorsList'))

const owdaDonorDetail = lazy(() =>
    import ('../components/Finance/DonorDetail'))

const owdaAccountDetail = lazy(() =>
    import ('../components/Finance/AccountDetail'))

const owdaBankDetail = lazy(() =>
    import ('../components/Finance/BankDetail'))

const owdaCurrencyList = lazy(() =>
    import ('../components/Finance/CurrencyList'))


const owdaIncomeList = lazy(() =>
    import ('../components/Finance/IncomeList'))
const owdaSectorsList = lazy(() =>
    import ('../components/OwdaProjects/OwdaSectorsList'))
const owdaSectorDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaSectorDetail'))
const owdaSitesList = lazy(() =>
    import ('../components/OwdaProjects/OwdaSitesList'))
const owdaSiteDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaSiteDetail'))
const owdaCategoryList = lazy(() =>
    import ('../components/OwdaProjects/OwdaCategoryList'))
const owdaCategoryDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaCategoryDetail'))
const owdaPartenerList = lazy(() =>
    import ('../components/OwdaProjects/OwdaPartenerList'))

const owdaPartenerDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaPartenerDetail'))

const owdaProjectList = lazy(() =>
    import ('../components/OwdaProjects/OwdaProjectsList'))
const owdaProjectDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaProjectDetail'))

const owdaBudgeetLinesList = lazy(() =>
    import ('../components/OwdaProjects/OwdaBudgetLinesList'))

const owdaBudgetLinesDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaBudgetLineDetail'))

const owdaAcitivityList = lazy(() =>
    import ('../components/OwdaProjects/OwdaActivitiesList'))

const OwdaBudgetCategoryList = lazy(() =>
    import ('../components/OwdaProjects/OwdaBudgetCategory'))

const owdaAcitivityDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaActivityDetail'))

const owdaDonorProject = lazy(() =>
    import ('../components/OwdaProjects/OwdaDonorProject'))

const owdaDonorPojectDetail = lazy(() =>
    import ('../components/OwdaProjects/OwdaDonorProjectDetail'))

const OwdaMainPayroll = lazy(() =>
    import ('../components/PayrollProjectConnect/MainPayroll'))

const PurchaseRequestList = lazy(() =>
    import ('../components/Logistics/PurchaseRequestList'))


const PurchaseRequestDetail = lazy(() =>
    import ('../components/Logistics/PurchaseRequestDetail'))

const QuotationList = lazy(() =>
    import ('../components/Logistics/QuotationList'))
const QuotationDetail = lazy(() =>
    import ('../components/Logistics/QuotatonDetail'))

const PurchaseOrderList = lazy(() =>
    import ('../components/Logistics/PurchaseOrderList'))
const PurchaseOrderDetail = lazy(() =>
    import ('../components/Logistics/PurchaseOrderDetail'))

const GrnList = lazy(() =>
    import ('../components/Logistics/GrnList'))

const GrnDetail = lazy(() =>
    import ('../components/Logistics/GrnDetail'))

const SupplierList = lazy(() =>
    import ('../components/Logistics/SupplierList'))



const SivList = lazy(() =>
    import ('../components/Logistics/SivList'))


const SivDetail = lazy(() =>
    import ('../components/Logistics/SivDetail'))



const StoreList = lazy(() =>
    import ('../components/Logistics/StoreList'))


const StoreDetail = lazy(() =>
    import ('../components/Logistics/StoreDetail'))


const PurchaseGroupList = lazy(() =>
    import ('../components/Logistics/PgroupList'))


const PurchaseGroupDetail = lazy(() =>
    import ('../components/Logistics/PgroupDetail'))


const PaymentRequestList = lazy(() =>
    import ('../components/Logistics/PaymentRequestList'))
const PaymenetRequestDetail = lazy(() =>
    import ('../components/Logistics/paymentRequestDetail'))

const SupplierDetail = lazy(() =>
    import ('../components/Logistics/SupplierDetail'))

const ProjectReport = lazy(() =>
    import ('../components/Reports/ProjectReport'))

// End of Owda Routes
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [{
        path: '/dashboard', // the url
        component: Dashboard, // view rendered
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'design', 'client', 'logistic_admin', 'hr']
    },





    {
        path: '/departments/:id',
        component: DepartmentDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },

    {
        path: '/users',
        component: UsersList,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/users/:id',
        component: UsersDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },

    {
        path: '/charts',
        component: Charts,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'design', 'finance_admin', 'logistic_admin', 'hr']
    },
    {
        path: '/designations',
        component: DesignationList,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/designations/:id',
        component: DesignationDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/departments',
        component: DepartmentList,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/employees',
        component: EmployeeList,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/employees/:id',
        component: EmployeeDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },

    {
        path: '/404',
        component: Page404,
    },


    // {
    //     path: '/requests',
    //     component: LetterRequests,
    //     roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    // },

    // {
    //     path: '/requests/:id',
    //     component: LetterRequestsDetail,
    //     roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    // },



    {
        path: '/chat',
        component: Chat,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'design', 'finance_admin', 'hr', 'logistic_admin']
    },
    {
        path: '/invoice',
        component: InvoiceList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
    },
    {
        path: '/invoice/:id',
        component: InvoiceDetailPage,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
    },
    {
        path: '/payment/:id',
        component: PaymentDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
    },
    // {
    //     path: "/contract",
    //     component: ContractList,
    //     roles: ['admin', 'general_admin', 'executive_director', 'finance', 'contractadmin']
    // },
    // {
    //     path: "/contract/:id",
    //     component: ContractDetail,
    //     roles: ['admin', 'general_admin', 'executive_director', 'finance', 'contractadmin']
    // },


    {
        path: "/leavetypelist",
        component: LeaveTypeList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/leavelist",
        component: LeaveList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/leave/:id",
        component: LeaveDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/payroll",
        component: PayrollList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/payroll/:id",
        component: payrollDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/candidates",
        component: CandidateList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/candidates/:id",
        component: CandidateDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/candidate/shortlisted",
        component: ShortListedCandidates,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/candidate/selected",
        component: SelectedCandidates,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    }, {
        path: "/timesheet",
        component: Timesheet,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    },
    {
        path: "/timesheet/:id",
        component: TimesheetDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
    }, ,
    {
        path: "/settings",
        component: Settings,
        roles: ['admin', ]
    },
    // Owda Routes
    {
        path: "/accountTypes",
        component: OwdaAccountTypesList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/accountTypes/:id",
        component: owdaAccountTypeDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/banks",
        component: owdaBankList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/banks/:id",
        component: owdaBankDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/accounts",
        component: owdaAccountList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/accounts/:id",
        component: owdaAccountDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/donors",
        component: owdaDonorList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/donors/:id",
        component: owdaDonorDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/currencies",
        component: owdaCurrencyList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },

    {
        path: "/income",
        component: owdaIncomeList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/sector",
        component: owdaSectorsList,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/sector/:id",
        component: owdaSectorDetail,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/site",
        component: owdaSitesList,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/site/:id",
        component: owdaSiteDetail,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/category",
        component: owdaCategoryList,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/category/:id",
        component: owdaCategoryDetail,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/partener",
        component: owdaPartenerList,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/partener/:id",
        component: owdaPartenerDetail,
        roles: ['admin', 'general_admin', 'executive_director']
    },
    {
        path: "/projects",
        component: owdaProjectList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/projects/:id",
        component: owdaProjectDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/budgetLines",
        component: owdaBudgeetLinesList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/budgetLines/:id",
        component: owdaBudgetLinesDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/activity",
        component: owdaAcitivityList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/budgetCategory",
        component: OwdaBudgetCategoryList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/activity/:id",
        component: owdaAcitivityDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/donorprojects",
        component: owdaDonorProject,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },
    {
        path: "/donorprojects/:id",
        component: owdaDonorPojectDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']
    },

    {
        path: "/mainPayroll",
        component: OwdaMainPayroll,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'hr']
    },

    {
        path: "/purchaseRequest",
        component: PurchaseRequestList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },

    {
        path: "/purchaseRequest/:id",
        component: PurchaseRequestDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },
    {
        path: "/quotation",
        component: QuotationList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },
    {
        path: "/quotation/:id",
        component: QuotationDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },

    {
        path: "/purchaseOrder",
        component: PurchaseOrderList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },
    {
        path: "/purchaseOrder/:id",
        component: PurchaseOrderDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },
    {
        path: "/grn",
        component: GrnList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },
    {
        path: "/grn/:id",
        component: GrnDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']

    },

    {
        path: "/siv",
        component: SivList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },
    {
        path: "/siv/:id",
        component: SivDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin']
    },

    {
        path: "/supplier",
        component: SupplierList,
        roles: ['admin', 'general_admin', 'executive_director']
    },

    {
        path: "/supplier/:id",
        component: SupplierDetail,
        roles: ['admin', 'general_admin', 'executive_director']
    },

    {
        path: "/store",
        component: StoreList,
        roles: ['admin', 'general_admin', 'executive_director', 'warehouse']
    },
    {
        path: "/store/:id",
        component: StoreDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'warehouse']
    },
    {
        path: "/purchaseGroup",
        component: PurchaseGroupList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },
    {
        path: "/purchaseGroup/:id",
        component: PurchaseGroupDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },
    {
        path: "/paymentRequest",
        component: PaymentRequestList,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },

    {
        path: "/paymentRequest/:id",
        component: PaymenetRequestDetail,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },

    {
        path: "/projectReport",
        component: ProjectReport,
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']
    },

    // End of Owda Routes
]

export default routes