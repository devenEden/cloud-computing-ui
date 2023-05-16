import React, { Component } from "react";
import SnackbarContent from "../components/Snackbar/SnackbarContent";

export default class _error extends Component {
  render() {
    return (
      <SnackbarContent
        message={
          <span>
            <b>Error:</b> An Error occured
          </span>
        }
        close
        color="danger"
        icon="info_outline"
      />
    );
  }
}
