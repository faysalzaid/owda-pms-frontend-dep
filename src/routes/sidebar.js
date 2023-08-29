/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */


// import { useAuth } from '../hooks/useAuth'


// let secret;




// // const { authState } = useAuth(
// const useCheckPermission = () => {
//     const { authState } = useAuth()
//     if (authState.role === "admin") {
//         return secret = "admin"
//     } else if (authState.role === "planning") {
//         return secret = "planning"
//     } else if (authState.role === "finance") {
//         return secret = "finance"
//     } else if (authState.role === "engineer") {
//         return secret = "engineer"
//     }
// }

// useCheckPermission()

let routes;

routes = [{
        path: '/app/dashboard', // the url
        icon: 'HomeIcon', // the component being exported from icons/index.js
        name: 'Dashboard', // name that appear in Sidebar
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'design', 'client', 'logistic_admin', 'hr']
    },
    // {
    //     path: '/app/companies',
    //     icon: 'SunIcon',
    //     name: 'Companies',
    //     roles: ['admin', 'finance', 'design', 'engineer', 'hr']
    // },

    // {
    //     path: '/app/bids',
    //     icon: 'FormsIcon',
    //     name: 'Bids',
    //     roles: ['admin', 'finance', 'engineer']
    // },

    {
        path: '/app/users',
        icon: 'PeopleIcon',
        name: 'Users',
        roles: ['admin', 'general_admin', 'executive_director', 'hr']
    },
    {
        path: '/app/charts',
        icon: 'ChartsIcon',
        name: 'Charts',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'design', 'finance_admin', 'logistic_admin', 'hr']
    },


    {
        path: '/app/chat',
        icon: 'ChatIcon',
        name: 'Chat',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'design', 'finance_admin', 'hr', 'logistic_admin']
    },
    {
        name: 'Projects',
        icon: 'TablesIcon',
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin'],
        routes: [
            // submenu
            {
                path: '/app/projects',
                icon: 'FaEllipsisV',
                name: 'Projects',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/donorprojects',
                icon: 'FaDonate',
                name: 'Don.Projects',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/category',
                icon: 'FaGripHorizontal',
                name: 'Categories',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/sector',
                icon: 'FaLayerGroup',
                name: 'Sectors',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/budgetLines',
                icon: 'FaMap',
                name: 'BudgetLines',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/activity',
                icon: 'FaSortAmountUp',
                name: 'Expenses',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/site',
                icon: 'FaHouseDamage',
                name: 'Sites',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/budgetCategory',
                icon: 'FaUserFriends',
                name: 'BL.Category',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },
            {
                path: '/app/partener',
                icon: 'FaUserFriends',
                name: 'Parteners',
                roles: ['admin', 'general_admin', 'executive_director', 'finance_admin']

            },


        ],
    },
    // {
    //     path: '/app/requests',
    //     icon: 'CardsIcon',
    //     name: 'Letter Requests',
    //     roles: ['admin', 'finance', 'hr']
    // },

    {
        path: '/app/invoice',
        icon: 'FaFileInvoiceDollar',
        name: 'Invoices',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
    },
    // {
    //     path: '/app/contract',
    //     icon: 'FaFileContract',
    //     name: 'Contracts',
    //     roles: ['admin', 'finance', 'contractadmin']
    // },



    {
        name: 'Reports',
        icon: 'FaReadme',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin'],
        routes: [
            // submenu
            {
                path: '/app/ProjectReport',
                icon: 'BsUiRadiosGrid',
                name: 'Project-Invoice',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },



        ],
    },


    {
        name: 'Finance',
        icon: 'FaRegMoneyBillAlt',
        routes: [
            // submenu
            {
                path: '/app/accounts',
                icon: 'BsUiRadiosGrid',
                name: 'Accounts',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/accountTypes',
                icon: 'BsUiChecks',
                name: 'Acc.Types',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/banks',
                icon: 'BsBank2',
                name: 'Banks',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/donors',
                icon: 'FaDonate',
                name: 'Donors',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/currencies',
                icon: 'BsCurrencyExchange',
                name: 'Currencies',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/income',
                icon: 'FaEuroSign',
                name: 'Income',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },
            {
                path: '/app/mainPayroll',
                icon: 'FaMix',
                name: 'MainPayroll',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'finance_admin']
            },


        ],
    },

    // LOGISTICS
    {
        path: "/app/purchaseRequest",
        name: 'Logistics',
        icon: 'FaIdeal',
        roles: ['admin', 'general_admin', 'executive_director', 'finance_admin', 'logistic_admin', 'hr']

    },
    {
        path: "/app/store",
        name: 'Store',
        icon: 'FaStoreAlt',
        roles: ['admin', 'general_admin', 'executive_director', 'warehouse']

    },
    {
        path: "/app/supplier",
        name: 'Suppliers',
        icon: 'FaBusinessTime',
        roles: ['admin', 'general_admin', 'executive_director']

    },

    //END OF LOGISTICS



    {
        name: 'Office Info',
        icon: 'PagesIcon',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr'],
        routes: [
            // submenu
            {
                path: '/app/employees',
                icon: 'MoonIcon',
                name: 'Employees',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/designations',
                name: 'Designations',
                icon: 'PagesIcon',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/departments',
                name: 'Departments',
                icon: 'SearchIcon',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/leavetypelist',
                name: 'LeaveType',
                icon: 'FaPills',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/leavelist',
                name: 'Leaves',
                icon: 'FaHandHoldingMedical',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/payroll',
                name: 'Payroll',
                icon: 'FaMoneyCheckAlt',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },

            {
                path: '/app/timesheet',
                name: 'M.timesheet',
                icon: 'FaUserClock',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },


        ],
    },
    {
        name: 'Jobs',
        icon: 'FaForumbee',
        roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr'],
        routes: [
            // submenu
            {
                path: '/app/candidates',
                icon: 'FaIoxhost',
                name: 'Candidates',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/candidate/shortlisted',
                icon: 'FaSlideshare',
                name: 'ShortListed',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },
            {
                path: '/app/candidate/selected',
                icon: 'FaHandsHelping',
                name: 'Selected',
                roles: ['admin', 'general_admin', 'executive_director', 'finance', 'hr']
            },


        ],
    },
    {
        path: '/app/settings',
        icon: 'BsFillGearFill',
        name: 'Settings',
        roles: ['admin', ]
    },
]

export default routes