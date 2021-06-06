import { Component, ReactElement, ReactNode} from 'react';

import WarningIcon from '../../assets/icons/warning.svg';
import './ErrorBoundary.scss';

const ErrorPage = (): ReactElement => {
  return (
    <div className="error-boundary">
      <WarningIcon  />
      <h2>Something went wrong!</h2>
      <p>Please reload the page or try again later.</p>
    </div>
  );
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <ErrorPage /> : children;
  }
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default ErrorBoundary;
