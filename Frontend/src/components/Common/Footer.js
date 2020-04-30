import React from "react";
import "../../css/footer.css";

const Footer = () => {
    return (
        <div>
            <footer class="page-footer text-center font-small mt-4 wow fadeIn">
                <hr class="my-4"/>

                <div class="pb-4">
                    <a href="/" target="_blank">
                        <i class="fab fa-facebook-f mr-3"></i>
                    </a>

                    <a href="/" target="_blank">
                        <i class="fab fa-twitter mr-3"></i>
                    </a>

                    <a href="/" target="_blank">
                        <i class="fab fa-youtube mr-3"></i>
                    </a>

                    <a
                        href="/"
                        target="_blank"
                    >
                        <i class="fab fa-google-plus-g mr-3"></i>
                    </a>

                    <a href="/" target="_blank">
                        <i class="fab fa-dribbble mr-3"></i>
                    </a>

                    <a href="/" target="_blank">
                        <i class="fab fa-pinterest mr-3"></i>
                    </a>

                    <a
                        href="https://github.com/divjyot3112/InfluenceMarketingApp"
                        target="_blank"
                    >
                        <i class="fab fa-github mr-3"></i>
                    </a>

                    <a href="/" target="_blank">
                        <i class="fab fa-codepen mr-3"></i>
                    </a>
                </div>

                <div class="footer-copyright py-3">
                    © 2020 Copyright:
                    <a
                        href="/"
                        target="_blank"
                    >
                        {" "}
                        Together{" "}
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
