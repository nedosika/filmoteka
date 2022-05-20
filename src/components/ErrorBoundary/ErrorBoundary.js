import React, { Component } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Sentry from '@sentry/browser';
import Dialog from '../Dialog';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      eventId: null,
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId, errorInfo, hasError: true });
    });
  }

  render() {
    if (this.state.hasError) {
      const { errorInfo } = this.state;
      return (
        <Dialog open={true}>
          <DialogTitle>Error: something went wrong</DialogTitle>
          <DialogContent>
            <DialogContentText>{errorInfo.componentStack.toString()}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => window.location.reload()}>Reload page</Button>
          </DialogActions>
        </Dialog>
      );
    }

    return this.props.children;
  }
}
