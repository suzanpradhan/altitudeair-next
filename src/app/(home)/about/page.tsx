'use client';
import { useEffect, useState } from 'react';
// import Rellax from 'rellax';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import Image from 'next/image';

interface BODsType {
  id: number;
  director?: string;
  position?: string;
  image?: string;
  fname?: string;
  lname?: string;
  // Define other properties based on the data structure
}

interface BODMessageType {
  id: number;
  introduction?: string | undefined;
  content?: string | undefined;
  image?: string | undefined;
}

interface CrewsType {
  id: number;
  team: string;
  image?: string;
  fname?: string;
  lname?: string;
  type?: SubType;
  onType?: string;
  totalTime?: string;
  description?: string;
  // Define other properties based on the data structure
}

interface SubType {
  title: string;
}

export default function About() {
  const [BODs, setBODs] = useState<BODsType[]>([]);
  const [crews, setCrews] = useState<CrewsType[]>([]);
  const [BODMessage, setBODMessage] = useState<BODMessageType>({
    id: 1,
    introduction: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    // new Rellax('.parallax-element');

    axiosInst
      .get('/crew/')
      .then((result) => {
        const data = result.data.data;
        setCrews(data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axiosInst
      .get('/BOD/')
      .then((result) => {
        const data = result.data.data;
        setBODs(data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axiosInst
      .get('/BODMessage/')
      .then((result) => {
        const data = result.data.data;
        setBODMessage(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <div
        className="featured-Image
      height={100}
      width={100} parallax-container"
      >
        <div className="parallax-element sky" data-rellax-speed="-5" />
        <div className="parallax-element topMountain" data-rellax-speed="-4" />

        <div className="parallax-element midMountain" data-rellax-speed="-2" />
        <h1 className="parallax-element heading" data-rellax-speed="-10">
          ABOUT US
        </h1>
        <div className="parallax-element botMountain" data-rellax-speed="0" />
      </div>

      <section className="introduction" id="overview">
        <div className="intro_text_wrapper">
          <h2>INTRODUCTION</h2>
          {parseHtml(BODMessage?.introduction ?? '')}
        </div>
      </section>

      <section className="director_section" id="message">
        <div className="h2_wrapper">
          <h2>MESSAGE FROM EXECUTIVE CHAIRMAN</h2>
        </div>
        <div className="director_message_wrapper">
          <div className="image_wrapper relative">
            <Image
              width={100}
              height={100}
              //   fill
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/images/errors/placeholder.webp';
              }}
              src={constants.baseUrl + BODMessage?.image ?? ''}
              alt="BODs Image"
            />
          </div>
          <div className="text_wrapper">
            {parseHtml(BODMessage?.content ?? '')}
            <span>{BODs[0]?.director}</span>
            <span>{BODs[0]?.position}</span>
          </div>
        </div>
      </section>

      <section className="three_info_section" id="board_info">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>BOARD &nbsp; OF &nbsp; DIRECTORS</h2>
          </div>

          <div className="card_container">
            {BODs &&
              BODs.map((member) => {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member?.image ?? ''}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <h3>Board Member</h3>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="crew_info_section bg-dark" id="crew">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>OUR &nbsp; CREWS</h2>
          </div>

          <div className="card_container">
            {crews &&
              crews.map((member) => {
                if (member.team === 'crew') {
                  return (
                    <div className="crew_card" key={member.id}>
                      <div className="image_overlay_wrapper relative">
                        <Image
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={constants.baseUrl + member.image}
                          alt="Crew Image"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/errors/placeholder.webp';
                          }}
                        />
                        <div className="overlay" />
                        <div className="overlay_container">
                          <h2 className="overlay_name">
                            {member.fname + ' ' + member.lname}
                          </h2>
                          <p className="type">
                            <strong>{member.type?.title.toUpperCase()}</strong>
                            <br />
                          </p>
                          <h3 className="cap-details">
                            <p>
                              <strong>On Type:</strong>&ensp;
                              {member.onType?.split(':')[0]} Hr{' '}
                              {member.onType?.split(':')[1]} Min
                              <br />
                              <strong>Air Time:</strong>&ensp;
                              {member.totalTime?.split(':')[0]} Hr{' '}
                              {member.totalTime?.split(':')[1]} Min
                            </p>
                          </h3>
                        </div>
                      </div>
                      <div className="person_info">
                        <h2 className="name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>MANAGEMENT &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crews.map((member) => {
              if (member.team === 'management') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section bg-dark">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>TECHNICAL &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crews.map((member) => {
              if (member.team === 'technical') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>QUALITY &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crews.map((member) => {
              if (member.team === 'quality') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section bg-dark">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>SAFETY &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crews.map((member) => {
              if (member.team === 'safety') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>
              CARGO &nbsp; SLING &nbsp; AND &nbsp; HUMAN &nbsp; LONGLINE &nbsp;
              RESCUE &nbsp; MISSION
            </h2>
          </div>

          <div className="card_container">
            {crews.map((member) => {
              if (member.team === 'mission') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="mission_and_vision" id="mission&vision">
        <div className="title_wrapper">
          <h1>MISSION AND VISION</h1>
          <div className="highlight" />
          <div className="bottom-border" />
        </div>

        <div className="content_wrapper">
          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>MISSION</h2>
            </div>
            <div className="mission_para_wrapper">
              <ul>
                <li>Work safely and efficiently</li>
                <li>Continuously review and improve our performance</li>
                <li>Constantly focus and ensure Customer Satisfaction</li>
                <li>Work in innovative partnership with our clients</li>
                <li>
                  Place values on the contribution of our employees, their job
                  satisfaction and well-being
                </li>
              </ul>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>VISION</h2>
            </div>
            <div className="mission_para_wrapper">
              <p>
                Our vision is to be recognized as the number one helicopter
                operator and maintenance organization in standard and safety to
                meet all our clients expectation and to be a leader in Improving
                the helicopter industry’s safety and standard.
              </p>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>VALUES</h2>
            </div>
            <div className="mission_para_wrapper">
              <ul>
                <li>Safety – above anything</li>
                <li>
                  Quality and Excellence – set and achieve high standards in
                  everything we do
                </li>
                <li>Teamwork – transparency and respect for one another</li>
                <li>Integrity & Ethics – do the right things</li>
              </ul>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>GOAL</h2>
            </div>
            <div className="mission_para_wrapper">
              <p>
                Altitude Air’s primary goal and essential core value is safety,
                which is never compromised. We value services that are
                inventive, punctual, efficient, cost-effective, dependable and
                the highest quality. We are dedicated to provide the best
                possible service to our customers. We value our team’s
                commitment for achieving our purpose, and we support and
                encourage collaboration in order to maintain a high level of
                competence, and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="infographic-section" id="statistics">
        <div className="h2_wrapper">
          <h2>MISSION&nbsp;STATISTICS</h2>
        </div>
        <div className="circle-background relative">
          <Image
            width={100}
            height={100}
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/about/infographic.webp"
            alt="circle"
          />
        </div>
      </section>
    </>
  );
}
