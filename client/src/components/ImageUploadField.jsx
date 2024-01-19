import axios from "axios"

export default function ImageUploadField({ formData, setFormData }) {


  async function handleImageUpload(e){
    const file = e.target.files[0]
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const endpoint = import.meta.env.VITE_UPLOAD_URL

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)

    const { data: { secure_url }} = await axios.post(endpoint, data)

    setFormData({ ...formData, image: secure_url })
  }

  function handleClearImage(){
    setFormData({ ...formData, image: null})
  }


  return (
    <>
      {formData.image ?
        <div className="image-upload-container">
          <button className="image-clear-button" onClick={handleClearImage}>❌</button>
          <img className="uploading-image" src={formData.image} alt='Uploaded image'/>
        </div>
        :
        <input type='file' className='image-upload-input' name='image' onChange={handleImageUpload}/>
      }
    </>
  )
}