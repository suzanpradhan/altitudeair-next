import ScrollIndicator from '@/app/(components)/(elements)/ScrollIndicator';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { ObjectResponseType } from '@/core/types/responseTypes';
import { constants } from '@/core/utils/constants';
import Image from 'next/image';
import Forms from './(components)/Form';

export default async function VoluntaryHazardReport() {
  const { data: voluntaryData } = await fetchData<ObjectResponseType<string>>(
    apiPaths.getVolutneryHazardUrl
  );

  return (
    <>
      <main className="hazard-main">
        <section>
          <div className=" relative featured-img !bg-[url(/images/banner/Kalapathhar.jpg)] ">
            <div className="absolute top-0 left-0 z-0 bg-black/50 w-full h-full"></div>
            <div
              className="relative flex w-full h-full items-center justify-center z-10 text-white text-3xl md:text-5xl lg:text-5xl xl:text-5xl"
              style={{ fontFamily: 'BankGothic-Regular' }}
            >
              Voluntary Hazard
            </div>

            <div className="fading-bottom" />
            <ScrollIndicator id="hazard_intro" />
          </div>
        </section>
        <section className="section_hazard_intro" id="hazard_intro">
          <div className="hazard_intro">
            <h2>Voluntary Hazard Report - Altitude Air Nepal</h2>
            <hr />
            <p className="english">
              Any of the Altitude Air Pvt. Ltd. employees noticing any hazard or
              observing any activity or procedure that may affect the safety of
              the people‚ aircraft‚ vehicles or equipment should fill Part A of
              this form as soon as practical and submit the completed form to
              person responsible for safety or drop in the boxes kept in
              different places for collecting such forms as far as practicable.
              The information contained in the form shall be used only for
              improving safety standard of the company. Confidentiality of the
              information and reporter shall be maintained.
            </p>
            <p className="nepali">
              अल्टिच्युड एयरका कुनै पनि कर्मचारीले, व्यक्ति, विमान, वाहन वा
              उपकरणको सुरक्षामा प्रतिकुल असर हुने गतिविधि वा खतराजन्य
              परिस्थितिको अवलोकन वा पहिचान गरेमा यस फारमको “ भाग ए “ भरि
              सुरक्षाका लागि जिम्मेवार व्यक्ति समक्ष प्रस्तुत गर्ने वा विभिन्न
              ठाउँमा राखिएका सुचना संकलन पेटिकामा यथाशिघ्र छिटो खसालि दिनु होला
              । यस फारममा भरिएका जानकारी कम्पनीको सुरक्षामानक सुधारको लागि मात्र
              प्रयोग गरिनेछ । फारममा उल्लेखित व्यक्तिगत विवरण गोप्य राखिने छ ।
            </p>
            <hr />
            <p>Please send your message below or download the form here.</p>
            <a
              href={constants.baseUrl + voluntaryData?.data}
              target="_blank"
              rel="noreferrer"
            >
              <button className="button-outline-light">DOWNLOAD NOW</button>
            </a>
          </div>
        </section>

        <section className="section_hazard_assets py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Useful Documents</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Policy PDF</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Preview the policy image and open it full size if needed.
                  </p>
                </div>
                <div className="relative h-80 w-full bg-gray-50">
                  <Image
                    src="/images/policy_pdf.jpeg"
                    alt="Policy PDF preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <a
                    href="/images/policy_pdf.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                  >
                    View full image
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">QR Code</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Scan the QR code or open it full size to access the link.
                  </p>
                </div>
                <div className="relative h-80 w-full bg-gray-50">
                  <Image
                    src="/images/qr.jpeg"
                    alt="QR code image"
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <div className="p-6 border-t border-gray-100">
                  <a
                    href="/images/qr.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
                  >
                    Open QR image
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="corner-border--top" />

          <h2>Voluntary Hazard Form</h2>
          <Forms />
          <div className="corner-border--bottom" />
        </section>
      </main>
    </>
  );
}
