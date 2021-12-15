import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";

class SchoolDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        console.log(props.match.params.id);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        name: "",
        email: "",
        contact_no: "",
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.editSchoolData(
            event.target.name.value,
            event.target.email.value,
            event.target.contact_no.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchSchoolData();
    }

    async fetchSchoolData() {
        var apihandler = new APIHandler();
        var schooldata = await apihandler.fetchSchoolDetails(
            this.props.match.params.id
        );
        console.log(schooldata);
        this.setState({ name: schooldata.data.data.school_name });
        this.setState({ contact_no: schooldata.data.data.school_phone });
        this.setState({ email: schooldata.data.data.school_email_id });
        this.setState({ dataLoaded: true });
    }

    viewSchoolDetails = (school_id) => {
        console.log(school_id);
        console.log(this.props);
    };

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
                                    {this.state.dataLoaded == false ? (
                                        <div className="text-center">
                                            <div class="preloader pl-size-xl">
                                                <div class="spinner-layer">
                                                    <div class="circle-clipper left">
                                                        <div class="circle"></div>
                                                    </div>
                                                    <div class="circle-clipper right">
                                                        <div class="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <h2>EDIT School</h2>
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
                                                    defaultValue={this.state.name}
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
                                                    defaultValue={this.state.email}
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
                                                    defaultValue={this.state.contact_no}
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
                                                ? "Edit School Data"
                                                : "Editing School Data Please Wait.."}
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

export default SchoolDetailsComponent;
