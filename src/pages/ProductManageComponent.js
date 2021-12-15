import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class ProductManageComponent extends React.Component {
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
        productDataList: [],
        dataLoaded: false,
        pname: "",
        sp: "",
        cp: "",
        quantity: "",
        mfd: "",
        school_id: "",
        id: 0,
    };

    async formSubmit(event) {
        event.preventDefault();
        console.log(event.target.pname);
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.editProductData(
            this.state.id,
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
        this.LoadInitialData();
    }

    async LoadInitialData() {
        var apihandler = new APIHandler();
        var schooldata = await apihandler.fetchSchoolOnly();
        var productdata = await apihandler.fetchAllProduct();
        this.setState({ schoollist: schooldata.data });
        this.setState({ productDataList: productdata.data.data });
        this.setState({ dataLoaded: true });
    }


    viewproductDetails = (index) => {
        console.log(this.state.productDataList[index]);
        this.setState({ id: this.state.productDataList[index].id });
        this.setState({ pname: this.state.productDataList[index].pname });
        this.setState({
            sp: this.state.productDataList[index].sp,
        });
        this.setState({ cp: this.state.productDataList[index].cp });
        this.setState({
            quantity: this.state.productDataList[index].quantity,
        });
        this.setState({ mfg_date: this.state.productDataList[index].mfg_date });
        this.setState({ school_id: this.state.productDataList[index].school_id });
    };


    render() {
        return (
            <section className="content">
                <div className="container-fluid">
                    <div className="block-header">
                        <h2>Manage Product</h2>
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
                                    <h2>All Product</h2>
                                </div>
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ID</th>
                                                <th>NAME</th>
                                                <th>Selling Price</th>
                                                <th>Cost Price</th>
                                                <th>Quantity</th>
                                                <th>MFD</th>
                                                <th>School ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.productDataList.map((product, index) => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.pname}</td>
                                                    <td>{product.sp}</td>
                                                    <td>{product.cp}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        {new Date(product.mfd).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td>{product.school_id}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-block btn-warning"
                                                            onClick={() => this.viewproductDetails(index)}
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
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>Manage Product</h2>
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <label htmlFor="email_address">Product Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="text"
                                                    id="pname"
                                                    name="pname"
                                                    className="form-control"
                                                    placeholder="Product Name"
                                                    defaultValue={this.state.pname}
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
                                                    defaultValue={this.state.sp}
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
                                                    defaultValue={this.state.cp}
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
                                                    defaultValue={this.state.quantity}
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">MFD</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input
                                                    type="date"
                                                    id="mfd"
                                                    name="mfd"
                                                    className="form-control"
                                                    placeholder="Enter MFD"
                                                    defaultValue={new Date(this.state.mfd).toLocaleString('en-GB')}
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="email_address">School Name</label>
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
                                                ? "Edit Product"
                                                : "Updating Product Please Wait.."}
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

export default ProductManageComponent;
