import React, {Component} from "react";
import "../../css/sponsorHome.css";
import WOW from "wow.js";
import {connect} from "react-redux";
import {
    getSponsorInProgressTasks,
    getSponsorPendingTasks,
} from "../../actions/homeActions";
import {TaskStatus} from "../../utils/Constants";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";
import {getEmailFromLocalStorage} from "../Common/auth";
import {If} from "react-if";

const NoImageFound = require("../../utils/Constants").NoImageFound;

class SponsorHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: getEmailFromLocalStorage(),
            pageSize: 3,
            currentPage: 1,
            progressPageSize: 3,
            progressCurrentPage: 1,
        };
    }

    componentDidMount() {
        const wow = new WOW();

        wow.init();

        this.props.getSponsorPendingTasks(this.state.email, TaskStatus.PENDING);
        this.props.getSponsorInProgressTasks(
            this.state.email,
            TaskStatus.INPROGRESS
        );
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };

    handleProgressPageChange = (page) => {
        this.setState({
            progressCurrentPage: page,
        });
    };

    displayPendingTasks(currentPage, pageSize) {
        if (this.props.pendingtasks.length > 0) {
            const paginatedPendingTasks = paginate(
                this.props.pendingtasks,
                currentPage,
                pageSize
            );

            let pendingtasks = paginatedPendingTasks.map((task) => {
                return (
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="card ">
                            <img
                                class="card-img-top"
                                src={task.image ? task.image : NoImageFound}
                                alt="Card image cap"
                            />
                            <div class="card-body">
                                <h5 class="card-title">{task.title}</h5>
                                <p class="card-text">{task.description}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">{task.category}</small>
                            </div>
                        </div>
                    </div>
                );
            });

            return pendingtasks;
        } else {
            return <div> No Tasks Pending! </div>;
        }
    }

    displayInProgressTasks(currentPage, pageSize) {
        if (this.props.inprogresstasks.length > 0) {
            const paginatedInProgressTasks = paginate(
                this.props.inprogresstasks,
                currentPage,
                pageSize
            );

            let inprogresstasks = paginatedInProgressTasks.map((task) => {
                return (
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="card">
                            <img
                                class="card-img-top"
                                src={task.image ? task.image : NoImageFound}
                                alt="Card image cap"
                            />
                            <div class="card-body">
                                <h5 class="card-title">{task.title}</h5>
                                <p class="card-text">{task.description}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">{task.category}</small>
                            </div>
                        </div>
                    </div>
                );
            });

            return inprogresstasks;
        } else {
            return <div> No Tasks Currently in Progress! </div>;
        }
    }

    render() {
        console.log("All pending tasks", this.props.pendingtasks);
        console.log("All inprogress tasks", this.props.inprogresstasks);

        return (
            <div class="border">
                {/* PENDING DIV*/}
                <div
                    class="container-lg ml-8 mt-5 border rounded"
                    style={{padding: "2%"}}
                >
                    <div>
                        <br/> <h2> PENDING TASKS </h2>{" "}
                    </div>

                    <div className="pages">
                        <Pagination
                            itemsCount={this.props.pendingtasks.length}
                            pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}
                        />{" "}
                    </div>
                    <If condition={this.props.pendingtasks.length > this.state.pageSize}>
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 text-right">
                                <button type="button" class="btn btn-outline-primary">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 text-left">
                                <button type="button" class="btn btn-outline-primary text-center">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </If>
                    <br/>
                    <div class="row">
                        <div class="card-deck">
                            {this.displayPendingTasks(
                                this.state.currentPage,
                                this.state.pageSize
                            )}
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        {" "}
                        <div class="col-md-10 col-sm-10 col-lg-10"></div>
                        <div class="col-md-2 col-sm-2 col-lg-2">
                        </div>
                    </div>
                </div>
                <div>
                    {" "}
                    <br/> <br/>
                    <hr/>
                    {" "}
                </div>
                {/* IN PROGRESS DIV*/}
                <div
                    class="container-lg ml-8 mt-5 border rounded"
                    style={{padding: "2%"}}
                >
                    <div>
                        <br/> <h2> IN PROGRESS TASKS </h2>{" "}
                    </div>
                    <div className="pages">
                        <Pagination
                            itemsCount={this.props.pendingtasks.length}
                            pageSize={this.state.progressPageSize}
                            onPageChange={this.handleProgressPageChange}
                            currentPage={this.state.progressCurrentPage}
                        />
                    </div>
                    <If condition={this.props.pendingtasks.length > this.state.progressPageSize}>
                        <div class="row ">
                            <div class="col-lg-6 col-md-6 col-sm-6 text-right">
                                <button type="button" class="btn btn-outline-primary">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 text-left">
                                <button type="button" class="btn btn-outline-primary text-center">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </If>
                    <br/>

                    <div class="card-deck">
                        {this.displayInProgressTasks(
                            this.state.progressCurrentPage,
                            this.state.progressPageSize
                        )}
                    </div>
                    <br/>
                    <div class="row">
                        {" "}
                        <div class="col-md-10 col-sm-10 col-lg-10"></div>
                        <div class="col-md-2 col-sm-2 col-lg-2">
                        </div>
                    </div>
                </div>
                <div>
                    {" "}
                    <br/> <br/>
                    <hr/>
                    {" "}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pendingtasks: state.home.pendingtasks,
    inprogresstasks: state.home.inprogresstasks,
});

//function mapDispatchToProps
export default connect(mapStateToProps, {
    getSponsorPendingTasks,
    getSponsorInProgressTasks,
})(SponsorHome);
