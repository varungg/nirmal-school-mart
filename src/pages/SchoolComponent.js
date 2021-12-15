import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class SchoolComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        SchoolDataList: [],
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveSchoolData(
            event.target.name.value,
            event.target.email.value,
            event.target.contact_no.value
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true })
        this.updateDataAgain();
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchSchoolData();
    }

    async fetchSchoolData() {
        var apihandler = new APIHandler();
        var schooldata = await apihandler.fetchAllSchool();
        console.log(schooldata);
        this.setState({ SchoolDataList: schooldata.data.data });
        this.setState({ dataLoaded: true });
        this.updateDataAgain();
    }

    viewSchoolDetails = (school_id) => {
        console.log(school_id);
        console.log(this.props);
        this.props.history.push("/schooldetails/" + school_id);
    };

    async updateDataAgain() {
        var apihandler = new APIHandler();
        var schooldata = await apihandler.fetchAllSchool();
        this.setState({ SchoolDataList: schooldata.data.data });
        this.setState({ dataLoaded: true });
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>MANAGE SCHOOL</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Add School</h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter School Name"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Email ID</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter School Email-ID"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Contact No.</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="contact_no"
                                                    name="contact_no"
                                                    className="form-control"
                                                    placeholder="Enter Contact No."
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect btn-block"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add School"
                                                : "Adding School Please Wait.."}
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
                                    <h2>All School's</h2>
                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>Name</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.SchoolDataList.map((school) => (
                                                <tr key={school.school_id}>
                                                    <td>{school.school_id}</td>
                                                    <td>{school.school_name}</td>
                                                    <td>{school.school_phone}</td>
                                                    <td>{school.school_email_id}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-block btn-warning"
                                                            onClick={() =>
                                                                this.viewSchoolDetails(school.school_id)
                                                            }
                                                        >
                                                            View
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

export default SchoolComponent;

