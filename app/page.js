"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Chatbot from './components/Chatbot';
import { useState } from 'react';

export default function Home() {

  const [dataset, setDataset] = useState("");

  const handleTextUpload = (file, text) => {
    // Process the uploaded text here
    setDataset(file);
    console.log(text);
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <div>
            <Image
              className={styles.logo}
              src="/Satoshi2.png"
              alt="Crypto Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 justify-center items-center">
          <div>
              <div className="flex flex-col items-center justify-center">
                   <Chatbot dataset={dataset}/>
              </div>
          </div>
      </div>
    </>
  )
}
