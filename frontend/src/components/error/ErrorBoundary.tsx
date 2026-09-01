import { Component } from 'react';
import type { ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { processUnknownError } from '../../util/errors';
import type { AppError } from '../../util/errors';

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
    return { error: processUnknownError(error) };
  }
}
