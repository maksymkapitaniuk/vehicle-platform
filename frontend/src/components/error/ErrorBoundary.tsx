import { Component, type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { AppError } from '../../util/errors';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  error: AppError | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: null };
  }

  render() {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }

  static getDerivedStateFromError(error: unknown) {
    if (!error) {
      return;
    }

    if (error instanceof AppError) {
      return { error };
    }

    if (error instanceof Error) {
      return { error: new AppError(error.message, { cause: error }) };
    }

    return {
      error: new AppError('Oops... An unknown error occurred.', {
        cause: error,
      }),
    };
  }
}
