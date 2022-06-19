import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { Button, Text, Element, Heading, Row, Portion, InputField, TextArea, HRule } from "fictoan-react"

import React from 'react';
import { useState, useEffect, useReducer, useRef } from 'react';

// https://www.npmjs.com/package/react-select
// https://react-select.com/home
import Select from 'react-select';

// https://www.npmjs.com/package/sentence-splitter
import { split } from "sentence-splitter";

// https://www.npmjs.com/package/react-device-detect
import { isMobile, isSafari } from 'react-device-detect';

// https://animate.style/
import 'animate.css';







// For dropdown styling
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    padding: '8px'
  }),
}

let sentences = [];

const initialState = {
  isPlaying: false,
  counter: -1
};


function populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions) {
  // console.log("Populating dropdown")
  const synth = window.speechSynthesis;
  let voiceData = synth.getVoices();
  let googleEnglishVoices = [], englishVoices = [], nonEnglishVoices = [];

  for (const element of voiceData) {
    // Push Google english voices
    if (element.name.substring(0, 6) == 'Google' && element.lang.substring(0, 2) == 'en') {
      googleEnglishVoices.push({
        label: `${element.name} (${element.lang})`, value: `${element.name} (${element.lang})`
      })
    }
    // Push non-Gogle english voices
    else if (element.lang.substring(0, 2) == 'en' && element.name.substring(0, 6) != 'Google') {
      englishVoices.push({
        label: `${element.name} (${element.lang})`, value: `${element.name} (${element.lang})`
      })
    }
    // Push non-english voices
    else {
      nonEnglishVoices.push({
        label: `${element.name} (${element.lang})`, value: `${element.name} (${element.lang})`
      })
    }
  }

  // Set state variables to update voices dropdown
  setGoogleEnglishOptions(googleEnglishVoices);
  setEnglishOptions(englishVoices);
  setNonEnglishOptions(nonEnglishVoices);
}

function fetchArticle(url, setFetching, setHugeText) {

  let articleRaw, articleHTML, articleContent;

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  setHugeText([]);

  fetch(`https://hidden-citadel-76712.herokuapp.com?url=${url}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      // console.log(result)
      articleRaw = JSON.parse(result)
      const parser = new DOMParser();
      articleHTML = parser.parseFromString(articleRaw.content, 'text/html');
      let array1 = articleHTML.querySelectorAll('h1, h2, h3, h4, h5, p, li, a');
      let article = `Title: ${articleRaw.title}.

`;

      for (const element of array1) {
        console.log(element.textContent)
        article = article + (element.textContent) + '. ';
      }
      setHugeText(article)
      setFetching(false)
    })
    .catch(error => console.log('error', error))



}

function handleSelectChange(event, voiceChoice, setVoiceChoice) {
  // console.log(event)
  if (event) {
    setVoiceChoice(event.label);
    localStorage.setItem('voice', event.label);
  }
  else {
    setVoiceChoice('Default');
    localStorage.setItem('voice', 'Default');
  }
}

function splitToSentences(hugeText) {
  if (hugeText == "")
    return;
  const sentencesData = split(hugeText);
  sentences = [];
  for (const element of sentencesData) {
    if (element.type == 'Sentence') {
      // console.log(element.raw);
      sentences.push(element.raw);
    }
  }
  // console.log(sentences);
}


function startSpeaking(voiceChoice, sentence, state) {
  const synth = window.speechSynthesis;
  let voiceData = synth.getVoices();
  let selectedVoice;

  for (const element of voiceData) {
    // console.log(`${element.name} (${element.lang})`)
    // console.log(voiceChoice)
    if (`${element.name} (${element.lang})` == voiceChoice)
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

function stopSpeaking() {
  const synth = window.speechSynthesis;
  synth.cancel();
}

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { counter: state.counter + 1, isPlaying: true };
    case "tick":
      return { ...state, counter: state.counter + 1 };
    case "pause":
      return { counter: state.counter - 1, isPlaying: false };
    case "stop":
      return { isPlaying: false, counter: - 1 };
    case "next":
      return { counter: state.counter + 2, isPlaying: true };
    case "prevA":
      return { counter: state.counter - 1, isPlaying: false };
    case "prevB":
      return { counter: state.counter + 1, isPlaying: true };
    default:
      throw new Error();
  }
}











export default function Home() {

  // State variables
  const router = useRouter()
  const [voiceChoice, setVoiceChoice] = useState(null);
  const [hugeText, setHugeText] = useState('This is a sample text! You can use this tool to proof-read your articles, explore pronunciation! On desktop devices, Google voices provided by Chrome browser are the best. On Android/iOS, good voices are installed by default, but may need tweaking in device settings.');
  const [url, setUrl] = useState('https://yakshag.medium.com/modern-ui-ux-backward-compatibility-24450e3c0d10');
  const [fetching, setFetching] = useState(false)

  const [helpTab, setHelpTab] = useState(1);
  const [googleEnglishOptions, setGoogleEnglishOptions] = useState([]);
  const [englishOptions, setEnglishOptions] = useState([
    { value: 'English', label: 'English' },
  ]);
  const [nonEnglishOptions, setNonEnglishOptions] = useState([
    { value: 'KN', label: 'KN' },
  ]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const isPlayingRef = useRef(false);

  // Grouped options array for grouped dropdown
  const groupedOptions = [
    {
      label: 'BEST ENGLISH VOICES',
      options: googleEnglishOptions,
    },
    {
      label: 'LOCAL ENGLISH VOICES',
      options: englishOptions,
    },
    {
      label: 'NON ENGLISH VOICES',
      options: nonEnglishOptions,
    }
  ];


  useEffect(() => {
    populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions);

    setTimeout(() => {
      populateDropDown(setGoogleEnglishOptions, setEnglishOptions, setNonEnglishOptions);
    }, 100);

    if (localStorage.getItem('voice')) {
      setVoiceChoice(localStorage.getItem('voice'));
    }
    else {
      setVoiceChoice('Default');
    }

    setHugeText('');

    if (isMobile) {
      window.addEventListener('blur', function () {
        dispatch({ type: "pause" })
      });
    }

    let urlParam = (new URLSearchParams(window.location.search)).get('url');
    if (urlParam) {
      setUrl(urlParam)
      setFetching(true)
      fetchArticle(urlParam, setFetching, setHugeText)
    }

    // Hotjar analytics
    (function (h, o, t, j, a, r) {
      h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
      h._hjSettings = { hjid: 2800643, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script'); r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

    // Mouseflow analytics
    window._mfq = window._mfq || [];
    (function () {
      var mf = document.createElement("script");
      mf.type = "text/javascript"; mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/d9319a07-5eae-4d34-b65b-6f52cd591faa.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  }, []);



  useEffect(() => {
    splitToSentences(hugeText);
  }, [hugeText]);



  useEffect(() => {
    console.log("isPlaying EFFECT; isPlaying " + state.isPlaying + "; counter " + state.counter);

    isPlayingRef.current = state.isPlaying;

    if (!state.isPlaying) {
      stopSpeaking()
      return;
    }
  }, [state.isPlaying]);



  useEffect(() => {
    console.log("counter EFFECT; isPlaying " + state.isPlaying + "; counter " + state.counter);

    if (!state.isPlaying)
      return;

    if (state.counter < 0)
      dispatch({ type: "stop" })

    if (state.counter < sentences.length) {
      startSpeaking(voiceChoice, sentences[state.counter]).then(() => {
        console.log("isPlayingRef " + isPlayingRef.current)
        if (state.isPlaying && isPlayingRef.current) {
          dispatch({ type: "tick" })
          console.log("Dispatched tick event")
        }
      })
    }
    else {
      dispatch({ type: "stop" })
      console.log("Dispatched stop event")
    }
  }, [state.counter])










  return (
    <div className={styles.container}>
      <Head>
        <title>Listen</title>
        <meta name="description" content="Listen to articles — just like a podcast!" />
        <link rel="icon" href="/headphones.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00a885" />
      </Head>



      {/* APP */}
      <Element as='div' marginTop='micro' style={{ display: 'flex' }}>
        <Heading as="h5" marginBottom='none' marginTop='nano' marginRight='nano'>
          <span
            className={`material-icons`}
            onClick={() => { router.push('/') }}
            style={{ cursor: 'pointer', fontWeight: '700' }}
          >arrow_back</span></Heading>
        <div>
          <Heading as="h4" marginBottom='none'> What will you listen to, today?</Heading>
          <Text marginTop='none' textColor="orange-70">Google Chrome recommended </Text>

        </div>
      </Element>

      {/* <Text marginTop='none' marginLeft='small' showOnlyOnMobile showOnlyOnTabPT>Google Chrome recommended </Text> */}


      <Row marginBottom='huge' className='push-to-ends'>
        {/* LEFT PORTION */}
        <Portion desktopSpan="15">
          <InputField
            label="Paste link to article"
            placeholder="https://yourfavblog.com/article-12"
            errorText="Looks invalid. Check?"
            type="url"
            value={url}
            onChange={(event) => { setUrl(event.target.value) }}
            style={{ color: `${styles.textColor}` }}
          />

          <Row marginBottom='none' >
            <Portion desktopSpan='10' mobileSpan='10' tabLSSpan='10' tabPTSpan='10'>
              {!fetching &&
                <Button kind="secondary" size="small" marginBottom='micro'
                  onClick={() => {
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
            id='text-area'
            label="Paste article text"
            placeholder="A word, a pragraph or a long article"
            rows={3}
            value={hugeText}
            onChange={(event) => { setHugeText(event.target.value) }}
            style={{ color: `${styles.textColor}`, lineHeight: '2rem' }}
            marginBottom="micro"
          />

          <Element marginTop='micro' as='div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text className={styles.primaryFontColor} style={{ margin: '0px 0px 2px 0px' }}>Pick a voice</Text>
            <Button kind="tertiary" size="small" marginBottom='none' style={{}}
              onClick={() => { router.push('/app/#help') }}
            >HELP</Button>
          </Element>

          {/* https://react-select.com/styles */}
          {/* https://yarnpkg.com/package/react-select */}
          {voiceChoice != null &&
            <Select
              className='animate__animated animate__pulse animate__delay-2s'
              styles={customStyles}
              options={groupedOptions}
              isSearchable={false}
              isClearable={true}
              // placeholder='That matches the text'
              onMenuOpen={() => { dispatch({ type: "pause" }) }}
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
        </Portion>


        {/* RIGHT PORTION */}
        <Portion desktopSpan='8'>




          {/* <Button kind="primary" size="small" marginTop='nano' marginRight='nano'
            onClick={() => {splitToSentences(); startSpeaking(voiceChoice);}}
          >LISTEN</Button> */}


          {(state.isPlaying) &&
            <>
              <Element showOnlyOnDesktop showOnlyOnTabLS as='div' shape='rounded'>
                <Element as='div' style={{ display: 'flex', alignItems: 'center' }}>
                  <Heading as='h6' weight='300' marginRight='micro' >Reading now</Heading>
                  <Element as='img' src='/speaking.gif' className={styles.icon48} style={{ width: '36px', alignSelf: 'center' }} />
                </Element>
                <div textColor="red">
                  {(isSafari)
                    ? (<Text marginTop='none' textColor='red-70'>App may not work on Safari</Text>)
                    : (<></>)
                  }
                </div>
                <Element as='div' style={{ height: '10rem', overflow: 'auto' }}>
                  <Text id='readingText' margin='none'><i>{sentences[state.counter]}</i></Text>
                </Element>
              </Element>
              <Element showOnlyOnMobile showOnlyOnTabPT as='div' shape='rounded'>
                <Element as='div' style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                  <Heading as='h6' weight='300' marginRight='micro' >Reading now</Heading>
                  <Element as='img' src='/speaking.gif' className={styles.icon48} style={{ width: '36px', alignSelf: 'center' }} />
                </Element>
                <Element as='div' style={{ height: '7rem', overflow: 'auto' }}>
                  <Text id='readingText' margin='none'><i>{sentences[state.counter]}</i></Text>
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
            {
              (state.counter < 0)
                ? (<div style={{ width: "100%", backgroundColor: `${styles.primaryColor}`, height: '4px' }}></div>)
                : (<div style={{ width: `${(state.counter / sentences.length) * 100}%`, backgroundColor: `${styles.primaryColor}`, height: '4px' }}></div>)
            }
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Button kind='tertiary' bgColor='transparent' size='tiny'
                onClick={() => {
                  dispatch({ type: "pause" })
                  setTimeout(() => {
                    dispatch({ type: "prevA" })
                  }, 200);
                  setTimeout(() => {
                    dispatch({ type: "prevB" })
                  }, 200);
                }}
              ><Text align='center'><span className={`material-icons ${styles.icon48}`}>skip_previous</span></Text></Button>
            </div>
            <div>
              {!(state.isPlaying) &&
                <Button kind='tertiary' bgColor='transparent' size='tiny'
                  onClick={() => {
                    if (isMobile)
                      router.push('/app#text-area')
                    dispatch({ type: "start" })
                  }}
                ><Text align='center'><span className={`material-icons ${styles.icon96}`}>play_arrow</span></Text></Button>
              }
            </div>
            <div>
              {(state.isPlaying) &&
                <Button kind='tertiary' bgColor='transparent' size='tiny'
                  onClick={() => { dispatch({ type: "pause" }) }}
                ><Text align='center'><span className={`material-icons ${styles.icon96}`}>pause</span></Text></Button>
              }
            </div>
            <div>
              <Button kind='tertiary' bgColor='transparent' size='tiny'
                onClick={() => {
                  dispatch({ type: "pause" })
                  setTimeout(() => {
                    dispatch({ type: "next" })
                  }, 200);
                }}
              ><Text align='center'><span className={`material-icons ${styles.icon48}`}>skip_next</span></Text></Button>
            </div>
          </div>
          <div>
            <Button kind='tertiary' bgColor='transparent' size='medium' isFullWidth
              onClick={() => { dispatch({ type: "stop" }) }}
              style={{ padding: '0px' }}
            ><Text align='center' weight='700' className={styles.primaryFontColor}>STOP</Text></Button>
          </div>
        </div>
      </div>





      {/* HELP */}
      <Element as='div' marginBottom='huge' id='help'>


        <Heading as="h4" marginTop='micro' marginBottom='tiny'>Need help?</Heading>
        <Element as='div' style={{ display: 'flex', cursor: 'pointer' }}>
          <Heading as='h6' marginRight='micro' style={{ borderBottom: `${(helpTab == 1) ? `3px solid ${styles.primaryColor}` : ''}` }} paddingBottom='nano'
            onClick={() => { setHelpTab(1) }}
          >
            Install app
          </Heading>
          <Heading as='h6' marginRight='micro' style={{ borderBottom: `${(helpTab == 2) ? `3px solid ${styles.primaryColor}` : ''}` }}
            onClick={() => { setHelpTab(2) }}
          >
            Voices
          </Heading>
          <Heading as='h6' marginRight='micro' style={{ borderBottom: `${(helpTab == 3) ? `3px solid ${styles.primaryColor}` : ''}` }}
            onClick={() => { setHelpTab(3) }}
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
            <Text weight='700' size="large" marginBottom='none'>How do I change default voice on a mobile device?</Text>
            <Text marginTop='none'>Default voices can be changed through Text to speech settings of the mobile device.</Text>
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

        <Text align='center' marginTop='small' marginBottom='none'>Another project by <a href='https://yakshag.github.io' target="blank">Vivek</a></Text>
      </Element>



    </div>
  )
}
