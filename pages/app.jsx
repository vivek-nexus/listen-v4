import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { Button, Text, Element, Heading, Row, Portion, InputField, TextArea, HRule } from "fictoan-react"

import React from 'react';
import { useState, useEffect } from 'react';

// https://www.npmjs.com/package/react-select
// https://react-select.com/home
import Select from 'react-select';

// https://www.npmjs.com/package/sentence-splitter
import { split } from "sentence-splitter";

// https://www.npmjs.com/package/react-device-detect
import { isMobile } from 'react-device-detect';







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

let sentences=[];
let appState='';
let lastSentence=0;


function populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions, setVoiceChoice){
  // console.log("Populating dropdown")
  const synth=window.speechSynthesis;
  let voiceData=synth.getVoices();
  let googleEnglishVoices=[], englishVoices=[], nonEnglishVoices = [];

  for (const element of voiceData){
    // Pre-selecting if the device has Google UK English Male
    if(`${element.name} (${element.lang})` == 'Google UK English Male (en-GB)'){
      console.log('Found Google male voice')
      setVoiceChoice(`${element.name} (${element.lang})`);
    }
    
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

function fetchArticle(url, setFetching, setHugeText){

  let articleRaw, articleHTML, articleContent;

  var requestOptions = {
    method : 'GET',
    redirect : 'follow'
  };

  setHugeText([]);

  fetch(`https://hidden-citadel-76712.herokuapp.com?url=${url}`, requestOptions)
  .then(response => response.text())
  .then(result => {
    // console.log(result)
    articleRaw=JSON.parse(result)
    const parser = new DOMParser();
    articleHTML = parser.parseFromString(articleRaw.content, 'text/html');
    let array1 = articleHTML.querySelectorAll('h1, h2, h3, h4, h5, p, li, a');
    let article=`Title: ${articleRaw.title}

`;
    
    for(const element of array1)
      article = article + (element.textContent)
    setHugeText(article)
    setFetching(false)
  })
  .catch(error => console.log('error',error))

  
  
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
  for(let i=lastSentence; i<sentences.length; i++){
    // if(lastSentence){
    //   i=lastSentence;
    //   lastSentence=null;
    // }

    setSentenceCounter(i);
    console.log('Sent sentence '+i+' for speaking')
    await startSpeaking(voiceChoice, sentences[i]);
    
    if(appState == 'paused' || appState == ''){
      // console.log('App state '+appState);
      console.log('Paused/stopped at sentence '+i);
      if(appState == 'paused')
        lastSentence=i;
        console.log('Breaking loop and returning')
      return;
    }

    if(appState == 'previous'){
      lastSentence = i-1;
      appState='playing'
      console.log('Breaking loop and returning')
      return;
    }

    if(appState == 'next'){
      lastSentence=i+1;
      appState='playing'
      console.log('Breaking loop and returning')
      return;
    }
  }

  lastSentence=0;
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

  // State variables
  const router = useRouter()
  const [voiceChoice, setVoiceChoice] = useState('Default');
  const [hugeText, setHugeText] = useState('This is a sample text');
  const [url, setUrl] = useState('https://yakshag.medium.com/modern-ui-ux-backward-compatibility-24450e3c0d10');
  const [fetching, setFetching] = useState(false)
  const [appUIState, setAappUIState] = useState('');
  const [sentenceCounter, setSentenceCounter] = useState(null);
  const [helpTab, setHelpTab] = useState(1);
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
  

  useEffect(() => {
    populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions, setVoiceChoice);

    setTimeout(() => {
      populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions, setVoiceChoice);
    }, 100);

    if(localStorage.getItem('voice')){
      setVoiceChoice(localStorage.getItem('voice'));
    }

    console.log(voiceChoice)
    // if(voiceChoice == null)
    //   setVoiceChoice('Default');

    setHugeText('This is a sample text! You can use this tool to proof-read your articles, explore pronunciation! On desktop devices, Google voices provided by Chrome browser are the best. On Android/iOS, good voices are installed by default, but may need tweaking in device settings.');
    
    if(isMobile){
      window.addEventListener('blur', function(){
        setAappUIState('paused')
      });
    }

    let urlParam = (new URLSearchParams(window.location.search)).get('url');
    if(urlParam){
      setUrl(urlParam)
      setFetching(true)
      fetchArticle(urlParam, setFetching, setHugeText)
    }
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
      lastSentence=0;
      stopSpeaking()
      setSentenceCounter(null)
    }
    // console.log('App state is '+appState)
  },[appUIState])

  // useEffect(() => {
  //   console.log(voiceChoice)
  //   if(voiceChoice === null)
  //     setVoiceChoice('Default');
  // },[voiceChoice])
  

  



  return (     
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
    
    

      {/* APP */}
      <Heading as="h4" marginTop='micro' marginBottom='none'>What will you listen to, today?</Heading>
      <Element as='div' marginBottom='micro' style={{ display: 'flex', alignItems: 'center' }}>
        <Element as='img'
          src='/chrome-logo.svg'
          className='icon-small'
          marginRight='nano'
        ></Element>
        <Text margin='none'>Recommended</Text>
      </Element>
      <Row marginBottom='huge' gutters='none' className={styles.surface}>
        {/* LEFT PORTION */}
        <Portion padding='micro' desktopSpan="15">
          <InputField
            id='link-input'
            label="Paste link to article"
            placeholder="https://yourfavblog.com/article-12"
            errorText="Looks invalid. Check?"
            type="url"
            value={url}
            onChange={(event) => {setUrl(event.target.value)}}
            style={{color : `${styles.textColor}`}}
          />

          <Row marginBottom='none'>
            <Portion desktopSpan='10' mobileSpan='10' tabLSSpan='10' tabPTSpan='10'>
              {!fetching &&
                <Button kind="secondary" size="small" marginBottom='micro'
                onClick={()=>{
                  setFetching(true);
                  fetchArticle(url, setFetching, setHugeText)
                }}
              >FETCH</Button>
              }
              {fetching &&
                <Button kind="secondary" size="small" marginBottom='micro'
                  isLoading
              >FETCH</Button>
              }
            </Portion>
            <Portion desktopSpan='14' mobileSpan='14' tabLSSpan='14' tabPTSpan='14'>
              <Text margin='none'>— OR —</Text>
            </Portion>
          </Row>
          
          <TextArea
            label="Paste article text"
            placeholder="A word, a pragraph or a long article"
            rows={4}
            value={hugeText}
            onChange={(event) => {setHugeText(event.target.value) }}
            style={{color : `${styles.textColor}`, lineHeight: '2rem'}}
          />
        </Portion>

        
        {/* RIGHT PORTION */}
        <Portion desktopSpan='9' padding='micro' paddingTop='none'>
          <Element marginTop='micro' as='div'style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
          <Text className={styles.primaryFontColor} style={{margin: '0px 0px 2px 0px'}}>Pick a voice</Text>
          <Button kind="tertiary" size="small" marginBottom='none' style={{}}
            onClick={() => {router.push('/app/#help')}}
          >HELP</Button>
          </Element>

          {/* https://react-select.com/styles */}
          {/* https://yarnpkg.com/package/react-select */}
          {voiceChoice!=null &&
            <Select
              styles={customStyles}
              options={groupedOptions}
              isSearchable={false}
              isClearable={true}
              // placeholder='That matches the text'
              onMenuOpen={()=> {setAappUIState('paused') }}
              // onMenuClose={() => { setAappUIState('playing') }}
              defaultValue={{ label: voiceChoice, value: voiceChoice }}
              onChange={(event) => { handleSelectChange(event, voiceChoice, setVoiceChoice) }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#03DAC599",
                  primary25: "#03DAC53D",
                  primary50: "#2E2E2E",
                  neutral0: "#2E2E2E",
                  neutral80: "white",
                }
              })}
            />
          }
          
          {/* <Button kind="primary" size="small" marginTop='nano' marginRight='nano'
            onClick={() => {splitToSentences(); startSpeaking(voiceChoice);}}
          >LISTEN</Button> */}
          

          {(appUIState == 'playing') &&
            <>
              <Element showOnlyOnDesktop showOnlyOnTabLS as='div' shape='rounded' style={{ marginTop: '3rem' }}>
                <Element as='div' style={{ display: 'flex', alignItems: 'center', marginTop: '5rem' }}>
                  <Heading as='h6' weight='300' marginRight='micro' >Reading now</Heading>
                  <Element as='img' src='/speaking.gif' className={styles.icon48} style={{ width: '36px', alignSelf: 'center' }} />
                </Element>
                <Element as='div' style={{ height: '10rem', overflow: 'auto' }}>
                  <Text id='readingText' margin='none'><i>{sentences[sentenceCounter]}</i></Text>
                </Element>
              </Element>
              <Element showOnlyOnMobile showOnlyOnTabPT as='div' shape='rounded'>
                <Element as='div' style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                  <Heading as='h6' weight='300' marginRight='micro' >Reading now</Heading>
                  <Element as='img' src='/speaking.gif' className={styles.icon48} style={{ width: '36px', alignSelf: 'center' }} />
                </Element>
                <Element as='div' style={{ height: '7rem', overflow: 'auto' }}>
                  <Text id='readingText' margin='none'><i>{sentences[sentenceCounter]}</i></Text>
                </Element>
              </Element>
            </>
          }
        </Portion>
      </Row>


      {/* <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}} id='help'/> */}

      <div style={{ position: 'fixed', width: '100%', right: 0, bottom: '2.5%' }}>
        <div className={styles.playerStrip} style={{ position: 'relative' }}>
          <div>
            <div style={{ width: `${(sentenceCounter / sentences.length) * 100}%`, backgroundColor: `${styles.primaryColor}`, height: '4px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Button kind='tertiary' bgColor='transparent' size='tiny'
                onClick={() => { setAappUIState('previous') }}
              ><Text align='center'><span className={`material-icons ${styles.icon48}`}>skip_previous</span></Text></Button>
            </div>
            <div>
              {(appUIState == '' || appUIState == 'paused') &&
                <Button kind='tertiary' bgColor='transparent' size='tiny'
                  onClick={() => {
                    // router.push('/app#link-input') 
                    setAappUIState('playing')
                  }}
                ><Text align='center'><span className={`material-icons ${styles.icon96}`}>play_arrow</span></Text></Button>
              }
            </div>
            <div>
              {(appUIState == 'playing' || appUIState == 'next' || appUIState == 'previous') &&
                <Button kind='tertiary' bgColor='transparent' size='tiny'
                  onClick={() => { setAappUIState('paused'); }}
                ><Text align='center'><span className={`material-icons ${styles.icon96}`}>pause</span></Text></Button>
              }
            </div>
            <div>
              <Button kind='tertiary' bgColor='transparent' size='tiny'
                onClick={() => { setAappUIState('next') }}
              ><Text align='center'><span className={`material-icons ${styles.icon48}`}>skip_next</span></Text></Button>
            </div>
          </div>
          <div>
            <Button kind='tertiary' bgColor='transparent' size='medium' isFullWidth
              onClick={() => { setAappUIState(''); }}
            ><Text align='center' weight='700' className={styles.primaryFontColor}>STOP</Text></Button>
          </div>
        </div>
      </div>


    


      {/* HELP */}
      <Element as='div' marginBottom='large' id='help'>
        
      
      <Heading as="h4" marginTop='micro' marginBottom='tiny'>Need help?</Heading>
      <Element as='div' style={{display:'flex', cursor: 'pointer'}}>
        <Heading as='h6' marginRight='micro' style={{borderBottom: `${(helpTab==1)? `3px solid ${styles.primaryColor}` : ''}`}} paddingBottom='nano' 
          onClick={() => {setHelpTab(1)}}
        >
          Install app
        </Heading>
        <Heading as='h6' marginRight='micro' style={{borderBottom: `${(helpTab==2)? `3px solid ${styles.primaryColor}` : ''}`}}
          onClick={() => {setHelpTab(2)}}
        >
          Voices
        </Heading>
        <Heading as='h6' marginRight='micro' style={{borderBottom: `${(helpTab==3)? `3px solid ${styles.primaryColor}` : ''}`}}
          onClick={() => {setHelpTab(3)}}
        >
          Other
        </Heading>
      </Element>

      {(helpTab == 1) &&
        <Element as='div'>
          <Text weight='700' size="large" marginBottom='none'>Mobile devices</Text>
          <Text marginTop='none' marginBottom='none'><strong>Android:</strong> Browser menu > Add to Home screen</Text>

          <Text weight='700' size="large" marginBottom='none'>Desktop</Text>
          <Text marginTop='none'>You can simply bookmark this page for regular use.</Text>
        </Element>
      }

      {(helpTab == 2) &&
        <Element as='div'>
          <Text>👉 Pick a voice that matches the text language.</Text>
          <Text>👉 On desktops, use Google Chrome for best voices.</Text>
          <Text>👉 On mobile devices, voices provided by the default text to speech engine are used.</Text>
          <Text weight='700' size="large" marginBottom='none'>I do not see any voices in the list</Text>
          <Text marginTop='none'>Refresh the page a couple of times or try a different browser such as Google Chrome. If none of the browsers help, then your device does not support text to speech.</Text>
        </Element>
      }

      {(helpTab == 3) &&
        <Element as='div'>
          <Text weight='700' size="large" marginBottom='none'>What browsers are supported?</Text>
          <Text marginTop='none'>This app should work on most modern browsers, except Safari.</Text>
          <Text weight='700' size="large" marginBottom='none'>Article is not being fetched or is messed up</Text>
          <Text marginTop='none'>Extracting an article from a web page is usually not fool proof due to various factors. Recommended fix is to copy paste the article text from the source page.</Text>
          <Text weight='700' size="large" marginBottom='none'>Speaking is stuck in the middle of a sentence</Text>
          <Text marginTop='none'>Skip to the next sentence. This could be due to very long sentences not being supported by the voice.</Text>
        </Element>
      }
      </Element>
      
    </div>
  )
}
