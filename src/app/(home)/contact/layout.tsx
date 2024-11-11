import { Metadata } from 'next';
import About from './page';
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page',
};

export default function AboutPage() {
  return <About />;
}
