import React,{useState} from 'react';
import imageCompression from "browser-image-compression";
import Card from 'react-bootstrap/Card';

const ImgCompressor = () => {
    
    const [originalImage,setOriginalImage] = useState("");

    const [originalLink,setOriginalLink]=useState("");
    const [imgPresence,setImgPresence] = useState(false);
    const [fileName,setFileName]= useState("");
    const [downloadLink,setDownloadLink] = useState("");
    const [clickStatus,setClickStatus] = useState(false);
  
    
    const handleChange=(e)=>{
      const imageFile  = e.target.files[0];
      setOriginalImage(imageFile);
      setOriginalLink(URL.createObjectURL(imageFile));
      setFileName(imageFile.name);
      setImgPresence(true);
    };
    const handleClick=(e)=>{
        e.preventDefault();
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true
        };
        if (options.maxSizeMB >= originalImage.size / 1024) {
          alert("Image is too small, can't be Compressed!");
          return 0;
        }
        imageCompression(originalImage, options).then(compressedFile=>{
          setDownloadLink(URL.createObjectURL(compressedFile));
        }).catch(err=>{
            console.log(err.message);
        });
        setClickStatus(true);
        return 1;
    }
    
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Reduce Image Size with Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {imgPresence ? (<Card.Img className="ht" variant="top" src={originalLink}></Card.Img>) : (
              <></>
            )}
            <div className="d-flex justify-content-center">
              <input type="file" accept="image/*" onChange={e=>handleChange(e)} className="mt-2 btn btn-dark w-75"/>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {fileName ? (<button type="button" onClick={e=>handleClick(e)} className="btn btn-dark">Compress</button>) : (<></>)}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src = {downloadLink}></Card.Img>
            { clickStatus ? (
              <div className="d-flex justify-content-center">
                <a href={downloadLink} download={fileName} className="mt-2 btn btn-dark w-75">Download</a>
              </div>
              ) : (<></>)
            }
          </div>
        </div>
      </div>
    );
}

export default ImgCompressor
