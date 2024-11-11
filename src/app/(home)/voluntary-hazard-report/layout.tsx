import { Metadata } from 'next';
import VoluntaryHazardReport from './page';
export const metadata: Metadata = {
  title: 'Voluntary Hazard',
  description: 'VoluntaryHazardReport page',
};

export default function VoluntaryPage() {
  return <VoluntaryHazardReport />;
}
