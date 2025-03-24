import React from 'react'
import AppButton from '../components/button'
import AboutPhoneCard from '../components/aboutPhone'

const HomePage = () => {
  return (
    <>
        <section className='px-[90px]'>
        <div className='flex pt-[130px] items-center justify-center mb-[150px]'>
        <div className='flex flex-col w-[50%]'>
            <h1 className='text-6xl font-bold leading-17'>Empowering <br></br>Future-ready <br></br>Schools</h1>
            <p className='mb-[50px]'>Lorem Ipsum is simply dummy text of the printing and typesetting 
industry. Lorem Ipsum has been the industry's standard dummy 
text ever since the 1500s, when an unknown printer took a galley
of type and scrambled it to make a type specimen book</p>
<AppButton name="Get Started"/>
        </div>
        <div className='w-[36%] h-[400px] bg-[#D9D9D9] rounded-[10px]'><img className='cover' src='src/assets/student.avif' /></div>
        </div>

        {/* About our technology */}
        <div className='flex flex-col items-center'>
            <h1 className='text-[#083C5D] font-bold text-2xl'>Our Technology and how it came about, the purposes and functions</h1>
            <div className='w-[150px] h-[2px] bg-[#083c5d] rounded-[20px]'></div>
            <p className='text-center w-[70%]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
                sometimes by accident, sometimes on purpose injected humour and the like. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
        </div>

        {/* Tutorials on how we got here */}

        <div className='flex mt-[150px] w-[90%] justify-center space-x-[5%] mb-[100px]'>
            <div className='w-[40%] h-[400px] bg-[#d9d9d9]'></div>
            <div className='flex flex-col items-end w-[40%] justify-between'>
                <div>
                <h1 className='text-2xl text-[#083c5d] text-end'>Lorem, ipsum is a random that we all can use</h1>
                <p className='text-end'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
                
                </div>
               <AppButton name="Watch Now"/>
            </div>
        </div>

        {/* About mobile application */}

        <div className='flex justify-center'>
            <div className='flex flex-col w-[40%]'>
                <AboutPhoneCard />
                <AboutPhoneCard />
                <AboutPhoneCard />
                <AboutPhoneCard />
                <AboutPhoneCard />
                
            </div>
            <div className='w-[500px] h-[400px] relative'>
                <img src='src/assets/phone.png'/>
                <img className='top-1 right-[200px] absolute' src='src/assets/chooseschool.png'/>
            </div>

        </div>


        </section>
    </>
  )
}

export default HomePage