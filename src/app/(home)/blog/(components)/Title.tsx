export default function Title() {
  return (
    <section className="title">
      <div className="overlay"></div>
      <div className="heading-container">
        <h1>ALTITUDE AIR </h1>
        <div className="p-wrapper">
          <div className="corner-border--open" />
          <p>
            In 2016 Altitude Air bought the first Airbus Helicopter for
            commercial operation in Nepal and is continuing to provide services
            in the country
          </p>
          <div className="corner-border--close" />
        </div>
      </div>

      <a href="#blog">
        <div className="learn-more">
          <h2>
            LEARN MORE
            <div className="arrow-bottom" />
          </h2>
        </div>
      </a>
    </section>
  );
}
