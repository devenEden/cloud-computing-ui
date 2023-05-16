import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import api from "../config/axios.config";
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    async (data) => {
      const response = await api.post("/blogs", data);
      return response.data;
    },
    {
      onSuccess: () => {
        router.push("/");
        toast.success("Hooray 😁!  We've Successfully created this!", {
          position: toast.POSITION.TOP_CENTER,
        });

        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      },
    }
  );
  const onSubmit = (data) => mutate(data);
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Cloud Computing"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <br />
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.form}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add A New Blog</h4>
                  </CardHeader>
                  <CardBody>
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
                    <CustomInput
                      labelText="Title..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        ...register("title"),
                      }}
                    />
                    <CustomInput
                      labelText="SubTitle"
                      id="suntite"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off",
                        ...register("subTitle"),
                      }}
                    />
                    <CustomInput
                      labelText="Content"
                      id="content"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off",
                        ...register("content"),
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      loading
                      type="submit"
                      simple
                      color="primary"
                      size="lg"
                    >
                      {isLoading ? "Adding...." : "Add"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
