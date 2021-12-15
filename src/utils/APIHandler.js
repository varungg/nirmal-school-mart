import { reactLocalStorage } from "reactjs-localstorage";

const { default: AuthHandler } = require("./AuthHandler");
const { default: Axios } = require("axios");
const { default: Config } = require("./Config");

class APIHandler {
    async checkLogin() {
        if (AuthHandler.checkTokenExpiry()) {
            try {
                var response = await Axios.post(Config.refreshApiUrl, {
                    refresh: AuthHandler.getRefreshToken(),
                });

                reactLocalStorage.set("token", response.data.access);
            } catch (error) {
                console.log(error);

                //Not Using Valid Token for Refresh then Logout the User
                AuthHandler.logoutUser();
                window.location = "/";
            }
        }
    }

    async saveSchoolData(
        name,
        email_id,
        contact_no
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.post(
            Config.schoolApiUrl,
            {
                school_name: name,
                school_phone: contact_no,
                school_email_id: email_id
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

    async fetchAllSchool() {
        await this.checkLogin();

        var response = await Axios.get(Config.schoolApiUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async fetchHomePage() {
        await this.checkLogin();

        var response = await Axios.get(Config.homeApiUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async fetchAllCustomerRequest() {
        await this.checkLogin();

        var response = await Axios.get(Config.customerRequestApiUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }


    async fetchSchoolDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.schoolApiUrl + "" + id + "/", {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async fetchMedicineByName(name) {
        if (name != "") {
            await this.checkLogin();

            var response = await Axios.get(Config.medicineNameApiUrl + "" + name, {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });

            return response;
        } else {
            return { data: [] };
        }
    }

    async editSchoolData(
        name,
        email_id,
        contact_no,
        id
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.put(
            Config.schoolApiUrl + "" + id + "/",
            {
                school_name: name,
                school_phone: contact_no,
                school_email_id: email_id,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }


    async saveCustomerRequestData(name, phone, medicine_details, prescription) {
        await this.checkLogin();
        //Wait Until Token Get Updated
        var formData = new FormData();
        formData.append("customer_name", name);
        formData.append("phone", phone);
        formData.append("medicine_details", medicine_details);
        formData.append("prescription", prescription);

        var response = await Axios.post(Config.customerRequestApiUrl, formData, {
            headers: {
                Authorization: "Bearer " + AuthHandler.getLoginToken(),
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    }

    async updateCustomerRequest(customer_id, name, phone, medicine_details) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.put(
            Config.customerRequestApiUrl + "" + customer_id + "/",
            {
                customer_name: name,
                phone: phone,
                medicine_details: medicine_details,
                status: 1,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );
        return response;
    }


    async generateBill(name, address, phone, medicineDetails) {
        await this.checkLogin();

        var response = await Axios.post(
            Config.generateBillApiUrl,
            {
                name: name,
                address: address,
                contact: phone,
                medicine_details: medicineDetails,
            },
            {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            }
        );

        return response;
    }


    async fetchSchoolOnly() {
        await this.checkLogin();

        var response = await Axios.get(Config.schoolOnly, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async saveProductData(
        pname,
        sp,
        cp,
        quantity,
        mfd,
        school_id,
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.post(
            Config.productApiUrl,
            {
                pname: pname,
                sp: sp,
                cp: cp,
                quantity: quantity,
                mfd: mfd,
                school_id: school_id,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

    async fetchAllProduct() {
        await this.checkLogin();

        var response = await Axios.get(Config.productApiUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async editProductData(
        id,
        pname,
        sp,
        cp,
        quantity,
        mfd,
        school_id,
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.put(
            Config.productApiUrl + "" + id + "/",
            {
                pname: pname,
                sp: sp,
                cp: cp,
                quantity: quantity,
                mfd: mfd,
                school_id: school_id,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

    async saveCompanyTransactionData(
        company_id,
        transaction_type,
        transaction_amt,
        transaction_date,
        payment_mode
    ) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.post(
            Config.companyAccountApiUrl,
            {
                company_id: company_id,
                transaction_type: transaction_type,
                transaction_amt: transaction_amt,
                transaction_date: transaction_date,
                payment_mode: payment_mode,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

    async fetchStaff() {
        await this.checkLogin();

        var response = await Axios.get(Config.staffApiURL, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async saveStaffData(job, salary, date_of_birth, sname, joining_date, address, phone) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.post(
            Config.staffApiURL,
            {
                job: job,
                salary: salary,
                date_of_birth: date_of_birth,
                sname: sname,
                joining_date: joining_date,
                address: address,
                phone: phone,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

    async fetchStaffById(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.staffApiURL + "" + id + "/", {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });

        return response;
    }

    async editStaffData(job, salary, date_of_birth, sname, joining_date, address, phone, id) {
        await this.checkLogin();
        //Wait Until Token Get Updated

        var response = await Axios.put(
            Config.staffApiURL + "" + id + "/",
            {
                job: job,
                salary: salary,
                date_of_birth: date_of_birth,
                sname: sname,
                joining_date: joining_date,
                address: address,
                phone: phone,
            },
            { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );

        return response;
    }

}

export default APIHandler;
