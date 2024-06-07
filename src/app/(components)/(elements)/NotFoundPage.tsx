import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="fourOfour_content_wrapper">
      <div className="image_text_wrapper">
        <Image
          src="/icons/404.svg"
          alt="404 Image"
          height={100}
          width={100}
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <p>Sorry. Requested page not found</p>
        <Link href="/">
          <button className="button-outline-light">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
