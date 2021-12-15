import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class StaffDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        staffList: [],
        dataLoaded: false,

        job: "",
        salary: "",
        date_of_birth: "",
        sname: "",
        joining_date: "",
        address: "",
        phone: "",
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.editStaffData(
            event.target.job.value,
            event.target.salary.value,
            event.target.date_of_birth.value,
            event.target.sname.value,
            event.target.joining_date.value,
            event.target.address.value,
            event.target.phone.value,
            this.props.match.params.id,
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        this.updateDataAgain();
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchStaffDataByID();
    }

    async fetchStaffDataByID() {
        this.updateDataAgain();
    }

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var staffData = await apihandler.fetchStaffById(
            this.props.match.params.id
        );

        this.setState({ job: staffData.data.data.job });
        this.setState({ salary: staffData.data.data.salary });
        this.setState({ date_of_birth: staffData.data.data.date_of_birth });
        this.setState({ sname: staffData.data.data.sname });
        this.setState({ joining_date: staffData.data.data.joining_date });
        this.setState({ date_of_birth: staffData.data.data.date_of_birth });
        this.setState({ address: staffData.data.data.address });
        this.setState({ phone: staffData.data.data.phone });
        //this.setState({ staffList: staffDataList.data.data });
        this.setState({ dataLoaded: true });
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Edit Staff #{this.props.match.params.id}</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Edit Staff</h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Name</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="sname"
                                                            name="sname"
                                                            className="form-control"
                                                            placeholder="Enter Name"
                                                            defaultValue={this.state.sname}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Joining Date</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="date"
                                                            id="joining_date"
                                                            name="joining_date"
                                                            className="form-control"
                                                            defaultValue={this.state.joining_date}
                                                            placeholder="Enter Date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Phone</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            name="phone"
                                                            className="form-control"
                                                            placeholder="Enter Phone"
                                                            defaultValue={this.state.phone}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Address</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="address"
                                                            name="address"
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                            defaultValue={this.state.address}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Date Of Birth</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="date"
                                                            id="date_of_birth"
                                                            name="date_of_birth"
                                                            className="form-control"
                                                            placeholder="Enter Date Of Birth"
                                                            defaultValue={this.state.date_of_birth}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Salary</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="salary"
                                                            name="salary"
                                                            className="form-control"
                                                            placeholder="Enter Salary"
                                                            defaultValue={this.state.salary}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Job</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="job"
                                                            name="job"
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                            defaultValue={this.state.job}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect btn-block"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Edit Staff"
                                                : "Editing Staff Please Wait.."}
                                        </button>
                                        <br />
                                        {this.state.errorRes == false &&
                                            this.state.sendData == true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}.
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {this.state.errorRes == true &&
                                            this.state.sendData == true ? (
                                            <div className="alert alert-danger">
                                                <strong>Failed!</strong>
                                                {this.state.errorMessage}.
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default StaffDetailsComponent;
