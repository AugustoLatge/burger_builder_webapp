import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilliary/Auxilliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    // Using the constructor instead of componentWillMount
    constructor(props) {
      super(props);
      // Other way of declaring the state
      this.state = { error: null };
      // Clear errors when sending request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      // Intercepting errors
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    // state = {
    //   error: null
    // };

    // componenWillMount() {
    //   axios.interceptors.request.use(req => {
    //     this.setState({ error: null });
    //     return req;
    //   });
    //   axios.interceptors.response.use(res => res, error => {
    //     this.setState({ error: error });
    //   });
    // }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
