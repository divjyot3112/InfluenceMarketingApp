import React, { Component } from "react";
import axios from "axios";
import "../../css/about.css";
import WOW from "wow.js";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="aboutus-section">
          <div class="container">
            <div class="row">
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="aboutus">
                  <h2 class="aboutus-title">About Us</h2>
                  <p class="aboutus-text">
                    Aenean vulputate eleifend tellus. Aenean leo ligula,
                    porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
                    lorem ante, dapibus in.
                  </p>
                  <p class="aboutus-text">
                    This is Photoshop's version of Lorem Ipsum. Proin gravida
                    nibh vel velit auctor aliquet. Aenean sollicitudin, lorem
                    quis bibendum auctor, nisi elit consequat ipsum, nec
                    sagittis sem
                  </p>
                  <a class="aboutus-more" href="#">
                    read more
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="aboutus-banner">
                  <img
                    src="http://themeinnovation.com/demo2/html/build-up/img/home1/about1.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md-5 col-sm-6 col-xs-12">
                <div class="feature">
                  <div class="feature-box">
                    <div class="clearfix">
                      <div class="iconset">
                        <span class="glyphicon glyphicon-cog icon"></span>
                      </div>
                      <div class="feature-content">
                        <h4>Work with heart</h4>
                        <p>
                          Aenean vulputate eleifend tellus. Aenean leo ligula,
                          porttitor eu, consequat vitae, eleifend ac, enim.
                          Aliquam lorem ante, dapibus in.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="feature-box">
                    <div class="clearfix">
                      <div class="iconset">
                        <span class="glyphicon glyphicon-cog icon"></span>
                      </div>
                      <div class="feature-content">
                        <h4>Reliable services</h4>
                        <p>
                          Donec vitae sapien ut libero venenatis faucibu. Nullam
                          quis ante. Etiam sit amet orci eget eros faucibus
                          tincidunt
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="feature-box">
                    <div class="clearfix">
                      <div class="iconset">
                        <span class="glyphicon glyphicon-cog icon"></span>
                      </div>
                      <div class="feature-content">
                        <h4>Great support</h4>
                        <p>
                          Aenean vulputate eleifend tellus. Aenean leo ligula,
                          porttitor eu, consequat vitae, eleifend ac, enim.
                          Aliquam lorem ante, dapibus in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
