import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { Button, Text, Element, Heading, Row, Portion, InputField, TextArea, HRule } from "fictoan-react"

import React from 'react';
import { useState, useEffect } from 'react';







export default function Home() {

  const router = useRouter()

  useEffect(() => {
    // Hotjar analytics
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:2800643,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  })


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
          {/* https://melvingeorge.me/blog/nextjs-pwa */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00a885" />
      </Head>


      {/* HERO SECTION */}
      <Row marginBottom='none' marginTop='small'>
        {/* DESKTOP MARK UP */}
        <Portion desktopSpan="one-third" hideOnTabPT hideOnMobile>
          <Element
            as="img"
            src="/headphones.png"
            marginBottom="small"
            // style={{ width: "164px" }}
            style={{ width: "192px", marginRight: "auto" }}
          />
        </Portion>

        {/* NON DESKTOP MARK UP */}
        <Portion marginBottom='small' showOnlyOnTabPT showOnlyOnMobile>
          <Element
            as="img"
            src="/headphones.png"
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
          <Button kind="secondary" size="medium" marginBottom='none'
            onClick={() => {router.push('/#add-to-site')}}
          >ADD TO YOUR SITE </Button>
          <Text marginBottom='none'>Google Chrome recommended</Text>        
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
          <Text marginBottom='none' align='center'>Google Chrome recommended</Text>
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


      <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}} id='add-to-site'/>

      <Heading as="h4" marginBottom='tiny' marginRight='nano'>Add Listen to your site or blog</Heading>
      <Row marginBottom='small'>
        <Portion desktopSpan='8' mobileSpan='24' tabLSSpan='24' tabPTSpan='24' marginBottom='small'>
          <Heading as='h6'>How?</Heading>
          <Text>Add a button to your page. A sample button could look like this —</Text>
          <a href='https://start-listening.herokuapp.com/app?url=https://yakshag.medium.com/modern-ui-ux-backward-compatibility-24450e3c0d10' target='blank'>
          <Button size='small' kind='secondary'
            >
            Listen to this article
          </Button>
          </a>
        </Portion>
        <Portion desktopSpan='16' mobileSpan='24' tabLSSpan='24' tabPTSpan='24' style={{overflow:'auto'}}>
          <Heading as='h6'>One line scalable integration</Heading>
          <Text size='large' textColor='white-70' bgColor='grey' padding='nano' shape='rounded' isMono>https://start-listening.herokuapp.com/app?url=<strong>https://yoursite.com/sample-article</strong></Text>
          <Text>Provide your page URL as a parameter.</Text>
          <Text>Your button click should open up a new tab to a URL like above. We will fetch the text from your page and be ready for the user to hit play.</Text>
        </Portion>
      </Row>

      <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}}/>

      {/* <HRule kind='primary' marginTop='medium' marginBottom='medium' sideMargin='medium' style={{color : `${styles.primaryColor}`}} id='app'/> */}

      <Text align='center' marginBottom='none'>Another project by <a href='https://yakshag.github.io' target="blank">Vivek</a></Text>
      <Text align='center' marginBottom='small'>Icon attribution: Music vector created by rawpixel.com - www.freepik.com</Text>
    </div>
  )


























      
}
