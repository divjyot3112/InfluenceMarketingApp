import React, { Component } from "react";
import axios from "axios";
import "../../css/sponsorHome.css";
import WOW from "wow.js";

class SponsorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const wow = new WOW();

    wow.init();
  }

  render() {
    return (
      <div>
        <p>
          {" "}
          <b style={{ "margin-left": "25%", "margin-top": "15%" }}>
            Pending Jobs{" "}
          </b>
        </p>
        {/* <!--Carousel Wrapper--> */}
        <div
          id="multi-item-example"
          class="carousel slide carousel-multi-item cardsstyle"
          data-ride="carousel"
        >
          {/* <!--Controls--> */}
          <div class="controls-top">
            <a
              class="btn-floating"
              href="#multi-item-example"
              data-slide="prev"
            >
              <i class="fas fa-chevron-left"></i>
            </a>
            <a
              class="btn-floating"
              href="#multi-item-example"
              data-slide="next"
            >
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
          {/* <!--/.Controls--> */}

          {/* <!--Indicators--> */}
          <ol class="carousel-indicators">
            <li
              data-target="#multi-item-example"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#multi-item-example" data-slide-to="1"></li>
          </ol>
          {/* <!--/.Indicators--> */}

          {/* <!--Slides--> */}
          <div class="carousel-inner" role="listbox">
            {/* <!--First slide--> */}
            <div class="carousel-item active">
              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.First slide--> */}

            {/* <!--Second slide--> */}
            <div class="carousel-item">
              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(48).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.Second slide--> */}
          </div>
          {/* <!--/.Slides--> */}
        </div>
        {/* <!--/.Carousel Wrapper--> */}

        <hr />
        {/* New carousal */}
        <p>
          {" "}
          <b style={{ "margin-left": "25%", "margin-top": "15%" }}>
            In Progress Jobs{" "}
          </b>
        </p>
        {/* <!--Carousel Wrapper--> */}
        <div
          id="multi-item-example2"
          class="carousel slide carousel-multi-item cardsstyle"
          data-ride="carousel"
        >
          {/* <!--Controls--> */}
          <div class="controls-top">
            <a
              class="btn-floating"
              href="#multi-item-example2"
              data-slide="prev"
            >
              <i class="fas fa-chevron-left"></i>
            </a>
            <a
              class="btn-floating"
              href="#multi-item-example2"
              data-slide="next"
            >
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
          {/* <!--/.Controls--> */}

          {/* <!--Indicators--> */}
          <ol class="carousel-indicators">
            <li
              data-target="#multi-item-example2"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#multi-item-example2" data-slide-to="1"></li>
          </ol>
          {/* <!--/.Indicators--> */}

          {/* <!--Slides--> */}
          <div class="carousel-inner" role="listbox">
            {/* <!--First slide--> */}
            <div class="carousel-item active">
              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.First slide--> */}

            {/* <!--Second slide--> */}
            <div class="carousel-item">
              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(48).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>

              <div class="col-md-3" style={{ float: "left" }}>
                <div class="card mb-2">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h4 class="card-title">Card title</h4>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a class="btn btn-primary">Button</a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.Second slide--> */}
          </div>
          {/* <!--/.Slides--> */}
        </div>
        {/* <!--/.Carousel Wrapper--> */}
      </div>
    );
  }
}
export default SponsorHome;
