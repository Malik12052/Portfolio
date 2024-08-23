import Example from '../components/Header';
import {AuroraHero} from '../components/Hero';
  import {RevealBento} from '../components/RevealBento';

export default function Home() {
  return (
    <div style={{  textAlign: 'center' }}>
      <Example />
      <AuroraHero />
      <RevealBento />
    </div>
  );
}
