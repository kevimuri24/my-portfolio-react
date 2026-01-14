import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({ success: null, message: "" });

  const onFormUpdate = (field, value) => {
    setFormDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    setStatus({ success: null, message: "" });

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json(); // IMPORTANT

      if (!response.ok) {
        // If your backend sends { message: "..."} on errors, display it:
        throw new Error(result?.message || `Request failed (${response.status})`);
      }

      setFormDetails(formInitialDetails);
      setStatus({ success: true, message: "Message sent successfully" });
    } catch (err) {
      setStatus({
        success: false,
        message: err?.message || "Oops, that didn't work. Please try again later.",
      });
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="Connect">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>

          <Col md={6}>
            <h2>Get In Touch</h2>

            <form onSubmit={handleSubmit}>
              {/* Row 1: First/Last name */}
              <Row>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => onFormUpdate("firstName", e.target.value)}
                  />
                </Col>

                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    value={formDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) => onFormUpdate("lastName", e.target.value)}
                  />
                </Col>
              </Row>

              {/* Row 2: Email (full width) */}
              <Row>
                <Col className="px-1">
                  <input
                    type="email"
                    value={formDetails.email}
                    placeholder="Email Address"
                    onChange={(e) => onFormUpdate("email", e.target.value)}
                  />
                </Col>
              </Row>

              {/* Row 3: Message (full width) */}
              <Row>
                <Col className="px-1">
                  <textarea
                    rows={6}
                    value={formDetails.message}
                    placeholder="Message"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                  />

                  <button type="submit" disabled={buttonText !== "Send"}>
                    <span>{buttonText}</span>
                  </button>
                </Col>
              </Row>

              {/* Status message */}
              {status.message && (
                <Row>
                  <Col>
                    <p className={status.success ? "success" : "danger"}>
                      {status.message}
                    </p>
                  </Col>
                </Row>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
