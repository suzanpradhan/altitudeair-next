import { Metadata } from 'next';
import Gallery from './page';
export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Gallery page',
};

export default function AboutPage() {
  return <Gallery />;
}
