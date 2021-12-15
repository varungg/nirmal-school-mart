class Config {
    static BASE_URL = "https://schoolmartapi.herokuapp.com/";
    static loginUrl = this.BASE_URL + "api/gettoken/";
    static refreshApiUrl = this.BASE_URL + "api/resfresh_token/";
    static schoolApiUrl = this.BASE_URL + "api/school/";
    static homeApiUrl = this.BASE_URL + "api/home_api/";
    static customerRequestApiUrl = this.BASE_URL + "api/customer_request/";
    static medicineNameApiUrl = this.BASE_URL + "api/medicinebyname/";
    static generateBillApiUrl = this.BASE_URL + "api/generate_bill_api/";
    static schoolOnly = this.BASE_URL + "api/schoolonly/";
    static staffApiURL = this.BASE_URL + "api/staff/";
    static productApiUrl = this.BASE_URL + "api/product/";
    static employeeSalaryApiUrl =
        this.BASE_URL + "api/employee_all_salary/";
    static employeeSalaryByIdApiUrl =
        this.BASE_URL + "api/employee_salaryby_id/";
    static homeUrl = "/home";
    static logoutPageUrl = "/logout";

    static sidebarItem = [
        { index: "0", title: "Home", url: "/home", icons: "home" },
        { index: "1", title: "School", url: "/school", icons: "business" },
        {
            index: "2",
            title: "Add Product",
            url: "/addProduct",
            icons: "add_box",
        },
        {
            index: "3",
            title: "Manage Product",
            url: "/manageProduct",
            icons: "border_color",
        },
        {
            index: "4",
            title: "Manage Staff",
            url: "/staffManage",
            icons: "mode_edit",
        },
        {
            index: "5",
            title: "Generate Bill",
            url: "/generateBill",
            icons: "assessment",
        },
        // {
        //     index: "7",
        //     title: "Customer Request",
        //     url: "/customerRequest",
        //     icons: "contacts",
        // },
    ];
}

export default Config;
