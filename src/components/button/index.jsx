import "./index.css";

const buttonVariant = {
  contained: "btn-contained",
  outlined: "btn-outlined",
  text: "btn-text",
};

export const Button = ({ children, variant = "contained", ...props }) => {
  return (
    <button
      {...props}
      className={`btn ${buttonVariant[variant]} ${props.className}`}>
      {children}
    </button>
  );
};
