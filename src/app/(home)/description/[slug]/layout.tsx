import { Metadata } from 'next';
import Description from './page';
export const metadata: Metadata = {
  title: 'Fleets',
  description: 'Fleets page',
};

export default function FleetsPage() {
  return <Description />;
}
