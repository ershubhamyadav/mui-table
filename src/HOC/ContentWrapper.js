import Footer from "../Includes/Footer";
import Header from "../Includes/Header";

export default function ContentWrapper(HocComponent) {
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <HocComponent />
      </div>
      <Footer />
    </>
  );
}
