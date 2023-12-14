import Techimg from '../assets/techevent.png';
import Nontechimg from '../assets/non-techevent.jpg';
import Sportseventimg from '../assets/sportsevent.jpg';
const Home = () => {
    return (
        <>
           <section className="h-auto flex flex-col p-5 bg-[#E4E9F7]">
                <div className="text-[#6236FF] text-center m-10 font-serif font-medium text-3xl p-5">Welcome !! </div>
                <div className="content1 text-center text-2xl">
                    To our Co-curricular Bank of Credits! <br/> Unlock your achievements, showcase your talents, and earn the recognition you deserve. <br/> Lets celebrate your journey of excellence together.
                </div>
                <div className="content2">
                    <div className="text-[#6236FF] m-3 font-serif font-medium text-3xl p-5">About Us</div>
                    <div className = "Para1 text-2xl m-2 p-5">Welcome to the Co-curricular Bank of Credits, your trusted platform for recognizing and rewarding the diverse talents and achievements of our students. We are committed to fostering a culture of holistic development and celebrating excellence in co-curricular activities.</div>
                </div>
                <div className="content3">
                    <div className="text-[#6236FF] m-5 font-serif font-medium text-3xl p-5">Categories</div>
                    <div className="m-5 categories flex flex-row items-center justify-between cursor-pointer">
                        <div className="card1 w-[350px] h-[250px]" style={{ backgroundImage: `url(${Techimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <h1 className="text-2xl flex flex-col w-[350px] h-[250px] items-center justify-center bg-sky-600 font-bold text-white text-opacity-0 bg-opacity-0 hover:bg-opacity-30 hover:text-white hover:text-opacity-100">Technical</h1>
                        </div>
                        <div className="card2 w-[350px] h-[250px]" style={{ backgroundImage: `url(${Nontechimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <h1 className="text-2xl flex flex-col w-[350px] h-[250px] items-center justify-center bg-sky-600 font-bold text-white text-opacity-0 bg-opacity-0 hover:bg-opacity-30 hover:text-white hover:text-opacity-100">Non - Technical</h1>
                        </div>
                        <div className="card3 w-[350px] h-[250px]" style={{ backgroundImage: `url(${Sportseventimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <h1 className="text-2xl flex flex-col w-[350px] h-[250px] items-center justify-center bg-sky-600 font-bold text-white text-opacity-0 bg-opacity-0 hover:bg-opacity-30 hover:text-white hover:text-opacity-100">Sports</h1>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default Home;