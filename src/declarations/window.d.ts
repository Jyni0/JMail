export { };

declare global {
  interface Window {
    app: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  };
}
