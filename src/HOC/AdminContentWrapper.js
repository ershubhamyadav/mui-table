import Footer from "../Includes/Footer";
import Header from "../Includes/Header";

export default function AdminContentWrapper(HocComponent) {
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <HocComponent />
      </div>
    </>
  );
}
