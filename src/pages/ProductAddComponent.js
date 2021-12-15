import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class ProductAddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        schoollist: [],
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });

        var apiHandler = new APIHandler();
        var response = await apiHandler.saveProductData(
            event.target.pname.value,
            event.target.sp.value,
            event.target.cp.value,
            event.target.quantity.value,
            event.target.mfd.value,
            event.target.school_id.value,

        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.LoadSchool();
    }

    async LoadSchool() {
        var apihandler = new APIHandler();
        var schooldata = await apihandler.fetchSchoolOnly();
        this.setState({ schoollist: schooldata.data });
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>ADD Product</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Add Product</h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="pname"
                                                    name="pname"
                                                    className="form-control"
                                                    placeholder="Enter Product Name"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Selling Price</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="sp"
                                                    name="sp"
                                                    className="form-control"
                                                    placeholder="Enter Selling Price"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Cost Price</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="cp"
                                                    name="cp"
                                                    className="form-control"
                                                    placeholder="Enter Cost Price"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Quantity</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="quantity"
                                                    name="quantity"
                                                    className="form-control"
                                                    placeholder="Enter Quantity"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">Manufacture Date</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="mfd"
                                                    name="mfd"
                                                    className="form-control"
                                                    placeholder="Enter Manufacture Date"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">School</label>
                                        <div className="form-group">
                                            <select
                                                className="form-control show-tick"
                                                name="school_id"
                                                id="school_id"
                                            >
                                                {this.state.schoollist.map((item) => (
                                                    <option key={item.school_id} value={item.school_id}>
                                                        {item.school_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect btn-block"
                                            disabled={this.state.btnMessage == 0 ? false : true}
                                        >
                                            {this.state.btnMessage == 0
                                                ? "Add Product"
                                                : "Adding Product Please Wait.."}
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

export default ProductAddComponent;
