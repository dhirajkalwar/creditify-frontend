import Techimg from '../assets/techevent.png';
import Nontechimg from '../assets/non-techevent.jpg';
import Sportseventimg from '../assets/sportsevent.jpg';
const CategoryPage = () => {
    return (
        <>
            <section className="h-full flex flex-col bg-[#E4E9F7]">
                <h1 className="text-[#6236FF] mt-20 p-5 font-Amita font-bold text-4xl">Category</h1>

                <div className="category p-5 flex flex-col items-center justify-between">
                    <div className="card m-3 flex flex-row items-center justify-between">
                        <img src={Techimg} className='w-[450px] h-[350px]'/>
                        <div className='flex flex-col w-[50%]'>
                            <h1 className='m-5 text-2xl font-bold text-[#6236FF]'>TECHNICAL</h1>
                            <p class="text-xl m-5 text-justify">Explore the world of innovation and problem-solving through technical activities . From Coding Competitions to robotics challenges, students sharpen their technical skills and creativity , making strides in the digital age.</p>
                        </div>
                    </div>
                    <div className="card m-3 flex flex-row-reverse items-center justify-between">
                        <img src={Nontechimg} className='w-[450px] h-[350px]'/>
                        <div className='flex flex-col w-[50%]'>
                            <h1 className='m-5 text-2xl font-bold text-[#6236FF]'>NON-TECHNICAL</h1>
                            <p class="text-xl m-5 text-justify">Immerse yourself in the rich tapestry of cultural diversity. From dance performance to art exhibitions , cultural activities celebrate traditions , creativity , and the vibrant spirit of our campus community.</p>
                        </div>
                    </div>
                    <div className="card m-3 flex flex-row items-center justify-between">
                        <img src={Sportseventimg} className='w-[450px] h-[350px]'/>
                        <div className='flex flex-col w-[50%]'>
                            <h1 className='m-5 text-2xl font-bold text-[#6236FF]'>SPORTS</h1>
                            <p class="text-xl m-5 text-justify">We invite you to be part of this exciting journey towards recognizing and rewarding the co-curricular excellence of our students . Together , we can create a more vibrant and dynamic campus community where every achievement counts.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CategoryPage