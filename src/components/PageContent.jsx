import classes from "./PageContent.module.css";

function PageContent({ title, children, className, titleClass }) {
  return (
    <div className={`${classes.content} ${className}`}>
      <h1 className={`${titleClass} w-100`}>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
