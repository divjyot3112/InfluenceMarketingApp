import React, { Component } from "react";
import "../../css/sponsorHome.css";
import WOW from "wow.js";
import { connect } from "react-redux";
import {
  getRecentlyPostedTasks,
  getMyActiveTasks,
  getRecommendations,
} from "../../actions/homeActions";
import { TaskStatus } from "../../utils/Constants";
import Pagination from "../Common/pagination";
import { paginate } from "../Common/paginate";
import { getEmailFromLocalStorage } from "../Common/auth";
import { If } from "react-if";
import { Link } from "react-router-dom";

const NoImageFound = require("../../utils/Constants").NoImageFound;

class InfluencerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: getEmailFromLocalStorage(),
      pageSize: 3,
      currentPage: 1,
      ActiveTasks_pageSize: 3,
      ActiveTasks_currentPage: 1,
      Recommended_pageSize: 3,
      Recommended_currentPage: 1,
    };
  }

  componentDidMount() {
    const wow = new WOW();

    wow.init();

    this.props.getRecentlyPostedTasks();
    this.props.getMyActiveTasks(this.state.email, TaskStatus.INPROGRESS);
    this.props.getRecommendations(this.state.email);
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleActiveTasksPageChange = (page) => {
    this.setState({
      ActiveTasks_currentPage: page,
    });
  };

  handleRecommendedPageChange = (page) => {
    this.setState({
      Recommended_currentPage: page,
    });
  };

  truncate = (input, length) =>
    input.length > length ? `${input.substring(0, length)}...` : input;

  displayRecentlyPostedTasks(currentPage, pageSize) {
    if (this.props.recentlypostedtasks.length > 0) {
      const paginatedrecentlyPostedTasks = paginate(
        this.props.recentlypostedtasks,
        currentPage,
        pageSize
      );

      let recentlypostedtasks = paginatedrecentlyPostedTasks.map((task) => {
        return (
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="card ">
              <Link
                to={{
                  pathname: "/task",
                  state: {
                    taskId: task._id,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <img
                  class="card-img-top"
                  src={task.image ? task.image : NoImageFound}
                  height="250"
                />
              </Link>
              <div class="card-body">
                <h5 className="card-title">{this.truncate(task.title, 20)}</h5>
                <p class="card-text">{this.truncate(task.description, 100)}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">{task.category}</small>
              </div>
            </div>
          </div>
        );
      });

      return recentlypostedtasks;
    } else {
      return <div> No Tasks Present! </div>;
    }
  }

  displayMyActiveTasks(ActiveTasks_currentPage, ActiveTasks_pageSize) {
    if (this.props.activetasks.length > 0) {
      const paginatedactivetasks = paginate(
        this.props.activetasks,
        ActiveTasks_currentPage,
        ActiveTasks_pageSize
      );

      let activetasks = paginatedactivetasks.map((task) => {
        return (
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="card ">
              <Link
                to={{
                  pathname: "/task",
                  state: {
                    taskId: task._id,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <img
                  class="card-img-top"
                  src={task.image ? task.image : NoImageFound}
                  height="250"
                />
              </Link>
              <div class="card-body">
                <h5 className="card-title">{this.truncate(task.title, 20)}</h5>
                <p class="card-text">{this.truncate(task.description, 100)}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">{task.category}</small>
              </div>
            </div>
          </div>
        );
      });

      return activetasks;
    } else {
      return <div> No Currently Active tasks Found! </div>;
    }
  }

  displayRecommendedTasks(Recommended_currentPage, Recommended_pageSize) {
    if (this.props.recommendedtasks.length > 0) {
      const paginatedrecommendedtasks = paginate(
        this.props.recommendedtasks,
        Recommended_currentPage,
        Recommended_pageSize
      );

      let recommendedtasks = paginatedrecommendedtasks.map((task) => {
        return (
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="card ">
              <Link
                to={{
                  pathname: "/task",
                  state: {
                    taskId: task._id,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <img
                  class="card-img-top"
                  src={task.image ? task.image : NoImageFound}
                  height="250"
                />
              </Link>
              <div class="card-body">
                <h5 class="card-title">{this.truncate(task.title, 20)}</h5>
                <p class="card-text">{this.truncate(task.description, 100)}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">{task.category}</small>
              </div>
            </div>
          </div>
        );
      });
      return recommendedtasks;
    } else {
      return (
        <div>
          {" "}
          No Recommendations! Complete a few tasks to get similar
          recommendations!{" "}
        </div>
      );
    }
  }

  render() {
    console.log("Recently posted tasks", this.props.recentlypostedtasks);
    console.log("My active tasks", this.props.activetasks);
    console.log("Recommended tasks", this.props.recommendedtasks);

    return (
      <div class="border">
        {/* RECENTLY POSTED DIV*/}
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> RECENTLY POSTED </h2>{" "}
          </div>
          <If
            condition={Object.keys(this.props.recentlypostedtasks).length != 0}
          >
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 ">
                <div className="pages">
                  <Pagination
                    itemsCount={this.props.recentlypostedtasks.length}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={this.state.currentPage}
                  />
                </div>
              </div>
            </div>
          </If>
          {/* <If
            condition={
              this.props.recentlypostedtasks.length > this.state.pageSize
            }
          >
            <div class="row ">
              <div class="col-lg-6 col-md-6 col-sm-6 text-right">
                <button type="button" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-6 text-left">
                <button
                  type="button"
                  class="btn btn-outline-primary text-center"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </If> */}
          <br />
          <div class="row">
            <div class="card-deck">
              {this.displayRecentlyPostedTasks(
                this.state.currentPage,
                this.state.pageSize
              )}
            </div>
          </div>
          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2"></div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br />
          <hr />{" "}
        </div>
        {/* MY ACTIVE DIV*/}
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> MY ACTIVE TASKS </h2>{" "}
          </div>
          <If condition={Object.keys(this.props.activetasks).length != 0}>
            <div className="pages">
              <Pagination
                itemsCount={this.props.activetasks.length}
                pageSize={this.state.ActiveTasks_pageSize}
                onPageChange={this.handleActiveTasksPageChange}
                currentPage={this.state.ActiveTasks_currentPage}
              />{" "}
            </div>
          </If>
          {/* <If
            condition={
              this.props.activetasks.length > this.state.ActiveTasks_pageSize
            }
          >
            <div class="row ">
              <div class="col-lg-6 col-md-6 col-sm-6 text-right">
                <button type="button" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-6 text-left">
                <button
                  type="button"
                  class="btn btn-outline-primary text-center"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </If> */}
          <br />
          <div class="card-deck">
            {this.displayMyActiveTasks(
              this.state.ActiveTasks_currentPage,
              this.state.ActiveTasks_pageSize
            )}
          </div>

          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2"></div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br />
          <hr />{" "}
        </div>
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> RECOMMENDED FOR YOU </h2>{" "}
          </div>

          <If condition={Object.keys(this.props.recommendedtasks).length != 0}>
            <div className="pages">
              <Pagination
                itemsCount={this.props.recommendedtasks.length}
                pageSize={this.state.Recommended_pageSize}
                onPageChange={this.handleRecommendedPageChange}
                currentPage={this.state.Recommended_currentPage}
              />{" "}
            </div>
          </If>
          {/* <If
            condition={
              this.props.recommendedtasks.length >
              this.state.Recommended_pageSize
            }
          >
            <div class="row ">
              <div class="col-lg-6 col-md-6 col-sm-6 text-right">
                <button type="button" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left"></i>
                </button>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-6 text-left">
                <button
                  type="button"
                  class="btn btn-outline-primary text-center"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </If> */}
          <br />
          <div class="row">
            <div class="card-deck">
              {this.displayRecommendedTasks(
                this.state.Recommended_currentPage,
                this.state.Recommended_pageSize
              )}
            </div>
          </div>
          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2"></div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br />
          <hr />{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recentlypostedtasks: state.home.recentlypostedtasks,
  activetasks: state.home.activetasks,
  recommendedtasks: state.home.recommendedtasks,
});

//function mapDispatchToProps
export default connect(mapStateToProps, {
  getRecentlyPostedTasks,
  getMyActiveTasks,
  getRecommendations,
})(InfluencerHome);
