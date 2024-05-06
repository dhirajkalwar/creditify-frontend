import Navbar from './Navbar'
import Footer from './Footer'
const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="px-10 py-5 errorpage bg-slate-100 dark:bg-slate-800">
                <div className="head-banner flex flex-col gap-4 p-5 bg-violet-500 w-full items-center justify-center rounded-lg">
                    <img src="/illustrate8.svg" alt="errorpage" className="w-[500px]"/>

                    <h2 className="text-4xl text-white font-bold">Oops !! 404 - Page not found</h2>
                    <p className="text-xl font-medium text-center p-3 text-black w-[50%]">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>

                    <a href="/"><button className="p-3 m-2 w-44 bg-white text-violet-700 items-center justify-between flex flex-row font-bold cursor-pointer hover:border-2 hover:border-white hover:text-white rounded-full hover:bg-transparent text-lg"><i className='bx bx-home-alt text-2xl'></i> Back to Home</button></a>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ErrorPage