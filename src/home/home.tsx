import { useEffect, useState } from 'react';
import axios from "axios";
function home() {
    const [date, setDate] = useState<Date | null>(null);
    const [images, setimage] = useState<string[]>([]);
    const [popupvisible, setpopupvisible] = useState(false);
    const [currentImage,setcurrentImage] = useState<string>('');
    useEffect(() => {
        if (window.sessionStorage.getItem('token')) {
            axios.post('https://photo.ujjwaldevelops.com/api/login/token', { "token": window.sessionStorage.getItem('token') })
                .then(() => {
                    
                })
                .catch(() => {
                    window.location.href = window.location.origin;
        })}
        else{
            window.location.href = window.location.origin;
        }
    }, []);
    function fetchPhoto(){
        setimage([]);
        if(date){
            axios.get('https://photo.ujjwaldevelops.com/api/photo?date='+date.toISOString().split('T')[0])
            .then((response)=>{
                setimage(response.data.images);
            })
            .catch(()=>{
                window.alert('No Images found')
            })
        }
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate ? new Date(selectedDate) : null);
    };
    function openImage(src:string){
        setcurrentImage(src)
        setpopupvisible(true);
    }
    function closePhoto(){
        setpopupvisible(false);
    }
    return (
        <div className="h-dvh w-screen bg-[#594545] flex justify-center items-end overflow-scroll">
        {popupvisible && (
            <div className="fixed h-screen w-screen bg-black opacity-99 flex flex-col justify-center items-center">
                <div className='h-[5%] w-screen flex justify-end items-center'>
                    <button className='text-white pr-5 pt-2' onClick={closePhoto}>X</button>
                </div>
                <div className='h-[95%] w-screen flex justify-center items-center'>
                    <img src={currentImage} className="h-full object-cover" loading="lazy" />
                </div>
            </div>
        )}
            <div className="flex flex-col justify-center items-center h-[99%] w-[95%]">
                <div className="h-[15%] w-full bg-[#815B5B] rounded-t-4xl flex justify-center items-center text-[#FFF8EA] md:text-7xl text-5xl font-[Dancing_Script]">
                    <b>Photo Storage</b>
                </div>
                <div className="h-[85%] w-full bg-[#FFF8EA] flex flex-col justify-start items-center gap-4 overflow-scrool">
                    <input id="date" value={date ? date.toISOString().split('T')[0] : ''} onChange={handleDateChange} className='border-b-2 h-12 p-2 md:w-80 w-75 border-[#594545] text-center text-xl text-[#594545] focus:outline-none' type='date'></input>
                    <button className='font-[Cascadia_Code] cursor-pointer border-[#594545] rounded-xl pl-2 pr-2 text-xl border-4 text-[#594545] hover:text-[#FFF8EA] hover:bg-[#594545]' onClick={fetchPhoto}><b>GO</b></button>
                    <div className='w-[99%] grid grid-cols-2 md:grid-cols-5 gap-1'>
                    {images.map((src, index) => (
                        <div key={index} className="w-full aspect-square">
                            <img onClick={() => openImage(src)} src={src} alt={`Image ${index}`} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default home