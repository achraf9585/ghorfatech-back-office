import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";
import withRouter from "../Common/withRouter";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
    };
  }

  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
    if (
      this.props.router.location.pathname !== prevProps.router.location.pathname
    ) {
      this.setState({ pathName: this.props.router.location.pathname }, () => {
        this.initMenu();
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    const { pathName } = this.state;

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end">
                  3
                </span>
                <span className="ms-1">{this.props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="/site-settings" className=" waves-effect">
                <i className="ri-dashboard-fill"></i>
                <span className="ms-1">{this.props.t("Site Settings")}</span>
              </Link>
            </li>

            <li>
              <Link to="/site-configurations" className=" waves-effect">
                <i className=" ri-profile-line"></i>
                <span className="ms-1">
                  {this.props.t("Site Configurations")}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-user-settings-line"></i>
                <span className="ms-1">{this.props.t("Manage Admins")}</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-profile-line"></i>
                <span className="ms-1">{this.props.t("Manage Listings")}</span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">
                  {this.props.t("Manage Reservations")}
                </span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-file-chart-2-line"></i>
                <span className="ms-1">{this.props.t("Manage Inquiry")}</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-bill-line"></i>
                <span className="ms-1">
                  {this.props.t("Manage Service Fee")}
                </span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-file-chart-2-line"></i>
                <span className="ms-1">{this.props.t("Manage Payout")}</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-file-chart-2-line"></i>
                <span className="ms-1">
                  {this.props.t("Manage Payment Gateway")}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-money-cny-box-line"></i>
                <span className="ms-1">{this.props.t("Manage Currency")}</span>
              </Link>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-file-chart-2-line"></i>
                <span className="ms-1">
                  {this.props.t("Reviews Management")}
                </span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-user-settings-line"></i>
                <span className="ms-1">{this.props.t("Admin Reviews")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ecommerce-products">
                    {this.props.t("Manage Reviews")}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce-product-detail/1">
                    {this.props.t("Write a review")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">
                  {this.props.t("Document verification")}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-user-settings-line"></i>
                <span className="ms-1">
                  {this.props.t("List settings for step 1")}
                </span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/room-type">{this.props.t("Room Type")}</Link>
                </li>
                <li>
                  <Link to="/person-capacity">
                    {this.props.t("Person Capacity")}
                  </Link>
                </li>
                <li>
                  <Link to="/house-type">{this.props.t("House Type")}</Link>
                </li>
                <li>
                  <Link to="/building-size">
                    {this.props.t("Building Size")}
                  </Link>
                </li>
                <li>
                  <Link to="/bedroom">{this.props.t("Bed Rooms")}</Link>
                </li>
                <li>
                  <Link to="/bed">{this.props.t("Beds")}</Link>
                </li>
                <li>
                  <Link to="/bed-type">{this.props.t("Bed Type")}</Link>
                </li>
                <li>
                  <Link to="/bathroom">{this.props.t("Bathrooms")}</Link>
                </li>
                <li>
                  <Link to="/bathroom-type">
                    {this.props.t("Bathroom Type")}
                  </Link>
                </li>
                <li>
                  <Link to="/essential">
                    {this.props.t("Essential Amenities")}
                  </Link>
                </li>
                <li>
                  <Link to="/safety">{this.props.t("Safety Amenities")}</Link>
                </li>
                <li>
                  <Link to="/space">{this.props.t("Spaces")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-user-settings-line"></i>
                <span className="ms-1">
                  {this.props.t("List settings for step 3")}
                </span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/guest-requirements">
                    {this.props.t("Guest requirements ")}
                  </Link>
                </li>
                <li>
                  <Link to="/house-rules">{this.props.t("House rules")}</Link>
                </li>
                <li>
                  <Link to="/review">
                    {this.props.t("Review how guests book")}
                  </Link>
                </li>
                <li>
                  <Link to="/max-nights">{this.props.t("Minimum nights")}</Link>
                </li>
                <li>
                  <Link to="/max-night">{this.props.t("Maximum nights")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{this.props.t("Messages")}</span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{this.props.t("Report Managment")}</span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">
                  {this.props.t("Cancellation policy management")}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{this.props.t("Search settings")}</span>
              </Link>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{this.props.t("Change password")}</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-mail-send-line"></i>
                <span className="ms-1">
                  {this.props.t("Home Page Settings")}
                </span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/email-inbox">
                    {this.props.t("Banner caption")}
                  </Link>
                </li>
                <li>
                  <Link to="/email-read">{this.props.t("Image banner")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{this.props.t("Footer block")}</Link>
                </li>
                <li>
                  <Link to="/email-read">
                    {this.props.t("Manage popular locations")}
                  </Link>
                </li>
                <li>
                  <Link to="/email-read">
                    {this.props.t("Static info block")}
                  </Link>
                </li>
                <li>
                  <Link to="/email-read">{this.props.t("Home Banner ")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="ri-calendar-2-line"></i>
                <span className="ms-1">{this.props.t("Why Host page")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withTranslation()(SidebarContent))
);
