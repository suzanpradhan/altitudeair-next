import PackagesList from './(components)/PackagesList';

export default function Packages() {
  return (
    <main className="news-main">
      <div
        className="relative h-[80vh] w-full bg-no-repeat bg-cover flex items-end justify-center"
        style={{ backgroundImage: 'url(/images/banner/banner-4.jpg)' }}
      >
        <div className="fading-bottom" />
        <h1
          className="text-white z-10 mb-16 text-3xl text-center"
          style={{ fontFamily: 'BankGothic-Regular', wordSpacing: '5px' }}
        >
          Heli Trek
        </h1>
      </div>
      <section className="news-section">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-bold mb-10">
            Helicopter tour over the Himalayas is indeed a lifetime experience.
            The magnificent views of the Himalayas is the unique specialty of
            helicopter treks.
          </h2>

          <PackagesList />
        </div>
      </section>
    </main>
  );
}
