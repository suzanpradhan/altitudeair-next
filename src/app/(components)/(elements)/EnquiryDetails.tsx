export default function EnquiryDetails() {
  return (
    <div>
      <div className="info_container">
        <div className="person_container">
          <div className="icon_container">
            {/* <FontAwesomeIcon icon={faPhone} title="Phone" /> */}
          </div>
          <div className="contact_container">
            <h3>Mingma T. Sherpa</h3>
            <p>+977 9801249907</p>
          </div>
        </div>
        <div className="person_container">
          <div className="icon_container">
            {/* <FontAwesomeIcon icon={faPhone} title="Phone" /> */}
          </div>
          <div className="contact_container">
            <h3>Chandra Pyakurel (Sudip)</h3>
            <p>+977 9801249908</p>
          </div>
        </div>

        <hr />
        <div className="email_container">
          {/* <FontAwesomeIcon icon={faEnvelope} title="Email" /> */}
          <h3>EMAIL</h3>
        </div>

        <p>
          For Booking:{' '}
          <a href="mailto:reservation@altitudeheli.com">
            reservation@altitudeheli.com
          </a>
        </p>
        <p>
          For Enquiry:{' '}
          <a href="mailto:marketing@altitudeheli.com">
            marketing@altitudeheli.com
          </a>{' '}
        </p>
      </div>
    </div>
  );
}
