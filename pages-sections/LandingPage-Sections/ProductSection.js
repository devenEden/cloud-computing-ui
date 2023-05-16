import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import styles from "/styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Button from "../../components/CustomButtons/Button.js";
import { useRouter } from "next/router.js";
import { useQuery } from "react-query";
import api from "../../config/axios.config.js";
import PageChange from "../../components/PageChange/PageChange.js";
import { isEmpty } from "lodash";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const router = useRouter();
  const { isLoading, data, error } = useQuery("blogs", async () => {
    const response = await api.get("/blogs");

    return response.data;
  });
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  return (
    <div className={classes.section}>
      {isLoading ? (
        <PageChange />
      ) : (
        <>
          {!isEmpty(error) && (
            <SnackbarContent
              message={
                <span>
                  <b>Error:</b> {error.server.message}
                </span>
              }
              close
              color="danger"
              icon="info_outline"
            />
          )}
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Read Our Posts</h2>
              <h5 className={classes.description}>
                This is the paragraph where you can write more details about
                your product. Keep you user engaged by providing meaningful
                information. Remember that by this time, the user is curious,
                otherwise he wouldn
                {"'"}t scroll to get here. Add a button if you want the user to
                see more.
              </h5>

              <Button onClick={() => router.push("/add")} color="info">
                Add Something New
              </Button>
            </GridItem>
          </GridContainer>
          <div>
            <GridContainer justify="center">
              {data.blogs?.map((blog) => {
                return (
                  <GridItem key={blog._id} xs={12} sm={6} md={4}>
                    <Card className={classes[cardAnimaton]}>
                      <br />
                      <CardHeader
                        color="primary"
                        className={classes.cardHeader}
                      >
                        <h4>{blog.title}</h4>
                        <div className={classes.socialLine}></div>
                      </CardHeader>
                      <br />
                      <p className={classes.divider}>Subtitle</p>
                      <CardBody>
                        <h4>{blog.subTitle}</h4>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <CardFooter className={classes.cardFooter}>
                          <Button
                            onClick={() => router.push(`/blogs/${blog._id}`)}
                            simple
                            color="primary"
                            size="lg"
                          >
                            Read More
                          </Button>
                        </CardFooter>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              })}
            </GridContainer>
          </div>
        </>
      )}
    </div>
  );
}
