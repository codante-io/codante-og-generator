import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Codante OG Image Generator</h1>
      {/* <Image
        src="https://s3-sa-east-1.amazonaws.com/codante/img/track-icons/track-bg2.png"
        alt="Imagem"
        width={3000}
        height={3000}
      /> */}
    </main>
  );
}

// 48
// 96
// 256
// 640
// 1080
// 2048
// 3840
