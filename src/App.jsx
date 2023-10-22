import { useEffect, useState } from 'react'
import './assets/logo-no-background.png';
import { TextField, Stack, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "./firebase";
import { setDoc, doc } from 'firebase/firestore';
import { v4 } from "uuid";

import './App.css'


function App() {

  const [aboutUs, setAboutUs] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [founderName, setFounderName] = useState("");
  const [aboutTheFounder, setAboutTheFounder] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pricePerShare, setPricePerShare] = useState(0);
  
  const [industries, setIndustries] = useState(Array(10).fill(false));

  const [video, setVideo] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [founderImage, setFounderImage] = useState(null);
  const [dataImage, setDataImage] = useState(null);

  const [videoLink, setVideoLink] = useState("");
  const [frontImageLink, setFrontImageLink] = useState("");
  const [founderImageLink, setFounderImageLink] = useState("");
  const [dataImageLink, setDataImageLink] = useState("");

  const [error, setError] = useState("");

  const industriesList = [
    'Technology',
    'Healthcare',
    'Financial Services',
    'Energy',
    'Consumer Goods',
    'Real Estate',
    'Transportation & Logistics',
    'Telecommunications',
    'Agriculture & Food Production',
    'Manufacturing',
  ];

  const checkBox = (index) => {
    const nextIndustries = industries.slice();
    nextIndustries[index] = !nextIndustries[index];
    setIndustries(nextIndustries);
  }

  const filterIndustries = () => {
    const result = [];
    for (let i = 0; i < industriesList.length; i++) {
      if (industries[i] == true) {
        result.push(industriesList[i]);
      }
    }
    return result;
  }



  const uploadFiles = () => {
    const videoRef = ref(storage, `videos/${v4() + video.name}`);
    uploadBytes(videoRef, video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoLink(url);
      })
    })

    const frontImageRef = ref(storage, `images/${v4() + frontImage.name}`);
    uploadBytes(frontImageRef, frontImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFrontImageLink(url);
      })
    })

    const founderImageRef = ref(storage, `images/${v4() + founderImage.name}`);
    uploadBytes(founderImageRef, founderImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFounderImageLink(url);
      })
    })

    const dataImageRef = ref(storage, `images/${v4() + dataImage.name}`);
    uploadBytes(dataImageRef, dataImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setDataImageLink(url);
      })
    })

  }

  const onSubmit = () => {

    setError("");


    if (video == null || frontImage == null || founderImage == null || dataImage == null || aboutUs === "" || aboutTheFounder === "" || goalAmount === 0 || founderName === "" || companyName == "" || pricePerShare == 0) {
      setError("Some info wasnt filled out...")

      if (video == null) {
        setError("video wasn't added...")
      } else if (frontImage == null) {
        setError("company image wasn't added...")
      } else if (dataImage == null) {
        setError("data image image wasn't added...")
      } else if (founderImage == null) {
        setError("founder image image wasn't added...")
      }

      return;
    }

    uploadFiles();
    setFounderImage(null)
  }

  useEffect(() => {

    if (videoLink == "" || dataImageLink == "" || founderImageLink == "" || frontImageLink == "") {
      return;
    }

    makeCompany();

    setVideoLink("");
    setDataImageLink("");
    setFounderImageLink("");
    setFrontImageLink("");

    setAboutUs("");
    setCompanyName("");
    setGoalAmount(0);
    setFounderName("");
    setAboutTheFounder("");
    setPricePerShare(0);

    setVideo(null);
    setFrontImage(null);
    setDataImage(null);

  }, [videoLink, dataImageLink, founderImageLink, frontImageLink])

  const makeCompany = () => {
    setDoc(doc(db, "companies", v4()), {
      name: companyName,
      about_us: aboutUs,
      goal_amount: Number(goalAmount),
      founders: [
        {
          name: founderName,
          about_me: aboutTheFounder,
          image: founderImageLink
        }
      ],
      price_per_share: Number(pricePerShare),
      front_image: frontImageLink,
      video: videoLink,
      current_total: 0,
      data: [
        {
          type: "image",
          data: dataImageLink
        }
      ],
      industries: filterIndustries()
    });

  }

  return (
    <>
      <Stack sx={{display:"flex", alignItems:"center"}}>
        <img src="https://cdn.discordapp.com/attachments/432623759673786370/1165572514093744249/logo-no-background.png?ex=654756fe&is=6534e1fe&hm=3d4829678d2e6f0268ae39474b4b04efb0e39bb8d0336a66ddfb94b9643d8b5f&" 
        width="30%"/>
        <Typography variant="p">Start crowdfunding now...</Typography>
      </Stack>

      <Stack>

        <div style={{padding:"20px"}}/>

        <TextField label="Company Name" value={companyName} onChange={(e)=>{setCompanyName(e.target.value)}}/>
        <div style={{padding:"20px"}}/>

        <Button variant="contained" sx={{colors:"#00000"}} component="label" onChange={(e)=>{setVideo(e.target.files[0])}}>
          Upload Video
          <input type="file" hidden/>
        </Button>
        <div style={{padding:"20px"}}/>

        
        <TextField label="About us" value={aboutUs} multiline  rows={6} onChange={(e)=>{setAboutUs(e.target.value)}}/>
        <div style={{padding:"20px"}}/>


        <Button
          variant="contained"
          component="label"
          onChange={(e)=>{setFrontImage(e.target.files[0])}}
        >
          Company Image
          <input type="file" hidden/>
        </Button>
        <div style={{padding:"20px"}}/>

      
        <TextField label="Goal Amount" value={goalAmount} type="number"  onChange={(e)=>{setGoalAmount(e.target.value)}}/>
        <div style={{padding:"20px"}}/>

        <TextField label="Price Per Share" value={pricePerShare} type="number"  onChange={(e)=>{setPricePerShare(e.target.value)}}/>
        <div style={{padding:"20px"}}/>



      <TextField label="Founder Name" value={founderName} variant="outlined" onChange={(e)=>{setFounderName(e.target.value)}}/>
      <div style={{padding:"20px"}}/>


      <TextField label="About the founder" value={aboutTheFounder} multiline  rows={6} onChange={(e)=>{setAboutTheFounder(e.target.value)}}/>
      <div style={{padding:"20px"}}/>

      <Button
          variant="contained"
          component="label"
          onChange={(e)=>{setFounderImage(e.target.files[0])}}
        >
          Founder Image
          <input type="file" hidden/>
        </Button>
        <div style={{padding:"20px"}}/>

        <Button
          variant="contained"
          component="label"
          onChange={(e)=>{setDataImage(e.target.files[0])}}
        >
        Data Image
        <input type="file" hidden/>
        </Button>
        <div style={{padding:"20px"}}/>
        
        <Stack direction={"row"} sx={{display:"flex" }}>
          <Typography varient="p">Industries</Typography>
        </Stack>
        <Stack direction={'row'} sx={{display:"flex", justifyContent:"space-between"}}>
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(0)}}/>} label="Technology" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(1)}}/>} label="Healthcare" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(2)}}/>} label="Financial Services" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(3)}}/>} label="Energy" />
        </Stack>
        <Stack direction={'row'} sx={{display:"flex", justifyContent:"space-between"}}>
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(4)}}/>} label="Consumer Goods" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(5)}}/>} label="Real Estate" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(6)}}/>} label="Transportation & Logistics" />
        </Stack>
        <Stack direction={'row'} sx={{display:"flex", justifyContent:"space-between"}}>
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(9)}}/>} label="Telecommunications" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(7)}}/>} label="Agriculture & Food Production" />
          <FormControlLabel control={<Checkbox  onChange={()=>{checkBox(8)}}/>} label="Manufacturing" />

        </Stack>
        <div style={{padding:"20px"}}/>

        <Button onClick={onSubmit}>Submit</Button>
        <h4>{error}</h4>

      </Stack>
    </>
  )
}

export default App
