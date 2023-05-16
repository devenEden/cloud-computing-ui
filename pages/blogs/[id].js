import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/profilePage.js";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import api from "../../config/axios.config";
import { isEmpty } from "lodash";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import PageChange from "../../components/PageChange/PageChange";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data, error } = useQuery("blogs", async () => {
    const response = await api.get(`/blogs/${id}`);

    return response.data;
  });
  return (
    <div>
      <Header
        color="transparent"
        brand="Cloud computing Assignment"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image="/img/profile-bg.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        {isLoading ? (
          <PageChange />
        ) : (
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img
                        src="/img/bg2.jpg"
                        alt="..."
                        className={imageClasses}
                        style={{
                          width: "120px",
                          height: "100px",
                        }}
                      />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{data?.blog?.title}</h3>
                      <h6>{data?.blog?.subTitle}</h6>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                {!isEmpty(error) ? (
                  <>
                    <SnackbarContent
                      message={
                        <span>
                          <b>Error:</b>{" "}
                          {error?.server?.message || error.message}
                        </span>
                      }
                      close
                      color="danger"
                      icon="info_outline"
                    />
                    <br />
                    <br />
                  </>
                ) : (
                  <>
                    <p>{data?.blog?.content}</p>
                    <br />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
