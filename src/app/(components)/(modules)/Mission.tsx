import Image from 'next/image';

const Mission = () => {
  const smallCircles = 8;
  const radius = 100;
  const gapOffset = 40;
  const moveRightPercent = 1;

  const circleImages = [
    '/images/heliski.png',
    '/images/chasing.png',
    '/images/charter.png',
    '/images/fliming.png',
    '/images/prilimage.png',
    '/images/moutain.png',
    '/images/Allogo.png',
    '/images/rescue.png',
  ];

  const imageSizes = [
    { width: 80, height: 80 },
    { width: 80, height: 80 },
    { width: 85, height: 85 },
    { width: 85, height: 85 },
    { width: 75, height: 75 },
    { width: 60, height: 60 },
    { width: 140, height: 140 },
    { width: 92, height: 92 },
  ];

  const texts = [
    '4% Heliski Flight',
    '7% Chasing Flight',
    '35% Charter Flight',
    '2% Filming Flight',
    '8% Pilgrimage Flight',
    '27% Mountain Flight And Breakfast',
    '',
    '17% Rescue Flight',
  ];

  const percentageTexts = ['4%', '7%', '35%', '2%', '8%', '27%', '17%'];

  const circles = Array.from({ length: smallCircles }, (_, i) => {
    const angle = (2 * Math.PI * i) / smallCircles;
    const x = radius + (radius + gapOffset) * Math.cos(angle);
    const y = radius + (radius + gapOffset) * Math.sin(angle);

    if (i === 6) {
      return (
        <div
          key={i}
          className="absolute rounded-full overflow-hidden"
          style={{
            width: `${imageSizes[i].width}px`,
            height: `${imageSizes[i].height}px`,
            left: '55%',
            top: '0%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image
            src={circleImages[i]}
            alt={`Circle ${i}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      );
    }

    return (
      <div
        key={i}
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${imageSizes[i].width}px`,
          height: `${imageSizes[i].height}px`,
          left: `calc(${x}px + ${moveRightPercent}%)`,
          top: `${y}px`,
          transform: 'translate(15%, 15%)',
        }}
      >
        <Image
          src={circleImages[i]}
          alt={`Circle ${i}`}
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
  });

  const textElements = texts.map((text, index) => {
    if (text === '') return null;

    const angle = (2 * Math.PI * index) / smallCircles;
    const x = radius + (radius + gapOffset + 100) * Math.cos(angle);
    const y = radius + (radius + gapOffset + 50) * Math.sin(angle);

    const isPercentageText = percentageTexts.some((percentage) =>
      text.includes(percentage)
    );

    return (
      <div
        key={index}
        className="absolute"
        style={{
          left: `calc(${x}px + ${moveRightPercent}%)`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100px',
        }}
      >
        <p
          className={`text-sm font-semibold ${
            isPercentageText ? 'text-yellow-500' : 'text-black'
          }`}
          style={{
            position: 'relative',
            bottom: '100px',
            left: '180px',
            fontSize: isPercentageText ? '16px' : '14px',
          }}
        >
          {text}
        </p>
      </div>
    );
  });

  return (
    <div
      className="relative"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="relative w-96 h-96 bg-white rounded-full"
        style={{
          width: `${radius * 6}px`,
          height: `${radius * 6}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="relative bg-[#f4f7f9] rounded-full"
          style={{
            width: `${radius * 4.5}px`,
            height: `${radius * 4.5}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="relative bg-[#e8eef3] rounded-full"
            style={{
              width: `${radius * 3}px`,
              height: `${radius * 3}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {circles}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{
                width: `${radius * 1.2}px`,
                height: `${radius * 1.2}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/banner/altitude.png"
                  alt="Inside box"
                  fill
                  objectFit="cover"
                  className="h-full w-full "
                />
                <div className="absolute inset-0 bg-black opacity-70"></div>
              </div>
              <div
                className="absolute"
                style={{
                  left: '65%',
                  top: '75%',
                  transform: 'translate(-50%, -50%)',
                  width: '140px',
                  height: '140px',
                }}
              >
                <Image
                  src="/images/helecopter.png"
                  alt="Helicopter"
                  layout="intrinsic"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {textElements}
    </div>
  );
};

export default Mission;
