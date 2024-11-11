import { Metadata } from 'next';
import About from './page';
export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

export default function AboutPage() {
  return <About />;
}
