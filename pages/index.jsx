import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { Button, Text, Element, Heading, Row, Portion, InputField, TextArea, HRule } from "fictoan-react"

import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';

// https://www.npmjs.com/package/react-select
// https://react-select.com/home
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// https://www.npmjs.com/package/sentence-splitter
import { split } from "sentence-splitter";

// https://www.npmjs.com/package/react-device-detect
import { browserName, CustomView } from 'react-device-detect';








// For dropdown styling
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    padding: '8px'
  }),
}

// let hugeText1='';
let sentences=[];
let appState='';
let lastSentence=null;
// let voiceChoice;


function populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions){
  // console.log("Populating dropdown")
  const synth=window.speechSynthesis;
  let voiceData=synth.getVoices();
  let googleEnglishVoices=[], englishVoices=[], nonEnglishVoices = [];

  for (const element of voiceData){
    // Push Google english voices
    if(element.name.substring(0,6) == 'Google' && element.lang.substring(0,2) == 'en'){
      googleEnglishVoices.push({
        label : `${element.name} (${element.lang})`, value : `${element.name} (${element.lang})`
      })
    }
    // Push non-Gogle english voices
    else if(element.lang.substring(0,2) == 'en' && element.name.substring(0,6) != 'Google'){
      englishVoices.push({
        label : `${element.name} (${element.lang})`, value : `${element.name} (${element.lang})`
      })
    }
    // Push non-english voices
    else{
      nonEnglishVoices.push({
        label : `${element.name} (${element.lang})`, value : `${element.name} (${element.lang})`
      })
    }
  }

  // Set state variables to update voices dropdown
  setGoogleEnglishOptions(googleEnglishVoices);
  setEnglishOptions(englishVoices);
  setNonEnglishOptions(nonEnglishVoices);
}

function handleSelectChange(event, voiceChoice, setVoiceChoice) {
  // console.log(event)
  if (event) {
    setVoiceChoice(event.label);
    localStorage.setItem('voice', event.label);
  }
  else {
    setVoiceChoice('Select');
    localStorage.setItem('voice', 'Select');
  }
}

function splitToSentences(hugeText){
  const sentencesData = split(hugeText);
  sentences=[];
  for (const element of sentencesData){
    if(element.type == 'Sentence'){
      // console.log(element.raw);
      sentences.push(element.raw);
    }
  }
  // console.log(sentences);
}

async function sentenceManager(voiceChoice, hugeText, sentenceCounter, setSentenceCounter, setAappUIState){
  splitToSentences(hugeText);

  console.log(sentences);
  console.log("Last sentence is "+lastSentence);
  for(let i=0; i<sentences.length; i++){
    if(lastSentence){
      i=lastSentence;
      lastSentence=null;
    }
    
    if(appState == 'paused' || appState == ''){
      // console.log('App state '+appState);
      console.log('Paused/stopped at sentence '+i);
      if(appState == 'paused')
        lastSentence=i-1;
      return;
    }

    if(appState == 'previous'){
      lastSentence = i-2;
      appState='playing'
      return
    }

    if(appState == 'next'){
      lastSentence=i;
      appState='playing'
      return
    }
    
    setSentenceCounter(i);
    console.log('i is '+i)
    await startSpeaking(voiceChoice, sentences[i]);
  }

  lastSentence=null;
  setSentenceCounter(null);
  setAappUIState('');
  appState='';
}


function startSpeaking(voiceChoice, sentence){
  const synth=window.speechSynthesis;
  let voiceData=synth.getVoices();
  let selectedVoice;

  for (const element of voiceData){
    // console.log(`${element.name} (${element.lang})`)
    // console.log(voiceChoice)
    if(`${element.name} (${element.lang})` == voiceChoice)
      selectedVoice = element;
  }

  // if(sentence=='' || sentence==undefined)
  //   return new Promise(resolve => {resolve;}
  // );

  const utterThis = new SpeechSynthesisUtterance(sentence);
  utterThis.voice = selectedVoice;
  synth.speak(utterThis);
  
  // https://stackoverflow.com/a/58049676
  // https://tombyrer.github.io/web-speech-synth-segmented/
  return new Promise((resolve) => {
    utterThis.onend = resolve;
  })
}

function stopSpeaking(){
  const synth=window.speechSynthesis;
  synth.cancel();
}











export default function Home() {

  const router = useRouter()
  const  [googleEnglishOptions, setGoogleEnglishOptions] = useState([]);
  const [englishOptions, setEnglishOptions] = useState([
    { value: 'English', label: 'English' },
  ]);
  const [nonEnglishOptions, setNonEnglishOptions] = useState([
    { value: 'KN', label: 'KN' },
  ]);
  // Grouped options array for grouped dropdown
  const groupedOptions = [
    {
      label : 'BEST ENGLISH VOICES',
      options : googleEnglishOptions,
    },
    {
      label : 'LOCAL ENGLISH VOICES',
      options : englishOptions,
    },
    {
      label : 'NON ENGLISH VOICES',
      options : nonEnglishOptions,
    }
  ];
  const [voiceChoice, setVoiceChoice] = useState(null);
  
  const [hugeText, setHugeText] = useState('This is a sample text');
  const [appUIState, setAappUIState] = useState('');
  const [sentenceCounter, setSentenceCounter] = useState(null);

  useEffect(() => {
    populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions);

    if(localStorage.getItem('voice')){
      setVoiceChoice(localStorage.getItem('voice'));
    }
    else{
      setVoiceChoice('Select');
    }

    setHugeText('This is a sample text! You can use this tool to listen to news or web pages instead of reading them, proof-read your articles, explore pronunciation or even just have fun! On desktop devices, Google voices provided by Chrome browser are the best. On Android/iOS, good voices are installed by default, but may need tweaking in device settings.');

    setTimeout(() => {
      populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions);
    }, 100);
  },[]);

  useEffect(()=>{
    // console.log('App UI state is '+appUIState)

    if(appUIState == 'playing'){
      appState='playing'
      sentenceManager(voiceChoice, hugeText, sentenceCounter, setSentenceCounter, setAappUIState)
    }
    if(appUIState == 'paused'){
      appState='paused'
      stopSpeaking()
    }
    if(appUIState=='next'){
      stopSpeaking()
      appState='next'
      setAappUIState('playing')
    }
    if(appUIState=='previous'){
      stopSpeaking()
      appState='previous'
      setAappUIState('playing')
    }
    if(appUIState == ''){
      appState='';
      lastSentence=null;
      stopSpeaking()
      setSentenceCounter(null)
    }
    // console.log('App state is '+appState)
  },[appUIState])

  useEffect(() => {
    // console.log('Sentence counter is '+sentenceCounter)
  },[sentenceCounter])

  // Execute on click of voices dropdown or on first render
  

  



  return (
    // <div className={styles.container}>
     
    
    <div className={styles.container}>
      <Head>
        <title>Listen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/headphones.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
      </Head>


      {/* HERO SECTION */}
      <Row marginBottom='none' marginTop='small'>
        {/* DESKTOP MARK UP */}
        <Portion desktopSpan="one-third" hideOnTabPT hideOnMobile>
          <Element
            as="img"
            src="/lizen/headphones.png"
            marginBottom="small"
            // style={{ width: "164px" }}
            style={{ width: "192px", marginRight: "auto" }}
          />
        </Portion>

        {/* NON DESKTOP MARK UP */}
        <Portion marginBottom='small' showOnlyOnTabPT showOnlyOnMobile>
          <Element
            as="img"
            src="/lizen/headphones.png"
            marginBottom="small"
            // style={{ width: "164px" }}
            style={{ width: "192px", margin: "auto" }}
          />
        </Portion>

        {/* DESKTOP MARK UP */}
        <Portion desktopSpan="two-third" hideOnTabPT hideOnMobile>
          <Heading as="h4" weight='500' marginBottom='nano'>Spending too much time on screen?</Heading>
          <Heading as="h2" weight='300' marginBottom='micro'><strike>Read</strike> Listen!</Heading>
          <Button kind="primary" size="medium" marginBottom='none' marginRight='nano'
            onClick={() => {router.push('/app')}}
          >START LISTENING</Button>
          {/* <Button kind="secondary" size="medium" marginBottom='none'
            onClick={() => {router.push('/app#help')}}
          >HELP </Button> */}
          <CustomView condition={browserName !== "Chrome"}>
            <Text marginBottom='none'>Google Chrome recommended</Text>
          </CustomView>
        
        </Portion>

        {/* NON DESKTOP MARK UP */}
        <Portion showOnlyOnTabPT showOnlyOnMobile>
          <Heading align='center' as="h4" weight='500' marginBottom='nano'>Spending too much time on screen?</Heading>
          <Heading align='center' as="h2" weight='300' marginBottom='small'><strike>Read</strike> Listen!</Heading>
          <div className='horizontally-center-this'>
            <Button kind="primary" size="medium" marginBottom='none' marginRight='nano'
              onClick={() => {router.push('/app')}}
            >START LISTENING</Button>
            <Button kind="secondary" size="medium" marginBottom='none'
              onClick={() => {router.push('/app#help')}}
            >INSTALL APP</Button>
          </div>
          <CustomView condition={browserName !== "Chrome"}>
            <Text marginBottom='none'>Google Chrome recommended</Text>
          </CustomView>
        </Portion>
      </Row>



      <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}}/>



      {/* FEATURES */}
      <Row marginBottom='small'>
        <Portion padding='nano' desktopSpan='5' mobileSpan='12' tabLSSpan='12' tabPTSpan='12'>
          {/* https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component */}
          <Text align='center'><span className={`material-icons ${styles.icon48}`}>cloud_download</span></Text>
          <Text align='center'>Fetch from links</Text>
        </Portion>
        <Portion desktopSpan='1' hideOnMobile hideOnTabLS hideOnTabPT></Portion>
        <Portion padding='nano' desktopSpan='5' mobileSpan='12' tabLSSpan='12' tabPTSpan='12'>
          <Text align='center'><span className={`material-icons ${styles.icon48}`}>description</span></Text>
          <Text align='center'>Paste text</Text>
        </Portion>
        <Portion desktopSpan='1' hideOnMobile hideOnTabLS hideOnTabPT></Portion>
        <Portion padding='nano' desktopSpan='5' mobileSpan='12' tabLSSpan='12' tabPTSpan='12'>
          <Text align='center'><span className={`material-icons ${styles.icon48}`}>devices</span></Text>
          <Text align='center'>All your devices</Text>
        </Portion>
        <Portion desktopSpan='1' hideOnMobile hideOnTabLS hideOnTabPT></Portion>
        <Portion padding='nano' desktopSpan='5' mobileSpan='12' tabLSSpan='12' tabPTSpan='12'>
          <Text align='center'><span className={`material-icons ${styles.icon48}`}>translate</span></Text>
          <Text align='center'>Languages</Text>
        </Portion>
      </Row>



      {/* <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}} id='app'/> */}

      <Text align='center' marginBottom='small'>Another project by <a href='https://yakshag.github.io' target="blank">Vivek</a></Text>



      {/* APP */}
      


      



      
      
    </div>
  )


























      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div> */}
}
