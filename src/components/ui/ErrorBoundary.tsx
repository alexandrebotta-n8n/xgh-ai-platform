"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 border border-red-900/30 bg-red-950/10 rounded-lg">
          <div className="text-center font-mono">
            <p className="text-red-500 text-xs uppercase tracking-widest mb-1">SYSTEM_ERROR</p>
            <p className="text-gray-500 text-[10px]">Component crashed. Refresh to retry.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
