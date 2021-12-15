import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class StaffComponent extends React.Component {
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
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveStaffData(
            event.target.job.value,
            event.target.salary.value,
            event.target.date_of_birth.value,
            event.target.sname.value,
            event.target.joining_date.value,
            event.target.address.value,
            event.target.phone.value,
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
        this.fetchStaffData();
    }

    async fetchStaffData() {
        this.updateDataAgain();
    }

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var staffDataList = await apihandler.fetchStaff();
        this.setState({ staffList: staffDataList.data.data });
        this.setState({ dataLoaded: true });
    }

    ShowStaffDetails = (eid) => {
        this.props.history.push("/staffdetails/" + eid);
    };

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>MANAGE Staff</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Add Staff</h2>
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
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Job</label>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input
                                                            type="text"
                                                            id="job"
                                                            name="job"
                                                            className="form-control"
                                                            placeholder="Enter Job"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
                                                ? "Add Staff"
                                                : "Adding Staff Please Wait.."}
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
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <h2>All Staff Data</h2>
                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Job</th>
                                                <th>Salary</th>
                                                <th>Date Of Birth</th>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Phone</th>
                                                <th>Joining Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.staffList.map((staff) => (
                                                console.log(staff),
                                                <tr key={staff.id}>
                                                    <td>{staff.id}</td>
                                                    <td>{staff.job}</td>
                                                    <td>{staff.salary}</td>
                                                    <td>
                                                        {new Date(staff.date_of_birth).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td>{staff.sname}</td>
                                                    <td>{staff.address}</td>
                                                    <td>{staff.phone}</td>
                                                    <td>
                                                        {new Date(staff.joining_date).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => this.ShowStaffDetails(staff.id)}
                                                        >
                                                            VIEW
                            </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default StaffComponent;
