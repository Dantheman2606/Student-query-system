const HoverScale = ({ children }) => {
  return (
    <div className="inline-block transition-transform duration-300 ease-in-out hover:scale-110">
      {children}
    </div>
  );
};


export default HoverScale;
