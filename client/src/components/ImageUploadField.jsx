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


  return (
    <>
      {formData.image ?
        <img src={formData.image} alt='Uploaded image'/>
        :
        <input type='file' name='image' onChange={handleImageUpload}/>
      }
    </>
  )
}