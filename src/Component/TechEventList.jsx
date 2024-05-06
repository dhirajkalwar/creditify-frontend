import Navbar from "./Navbar"
import Footer from "./Footer"
const TechEventList = () => {
    return (
        <>
            <Navbar/>
            <div className="p-5 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-violet-700 dark:text-white">Technical Event List</h2>

                <div className="mt-5 flex flex-col w-full items-center justify-center rounded-lg">
                    <div className="p-3 text-xl font-bold text-white bg-violet-500 w-full flex flex-col items-center justify-center rounded-t-lg">
                        <h2>Event List</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>Technack - ACM</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>Robo - Making</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>Go-Cart</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>Competitions (Others)</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>Tech Seminars / Tech Webinars / Tech Workshops</h2>

                        <ul className="pt-2">
                            <li>1. ACM (Association for Computing Machinery)</li>
                            <li>2. CSI (Computer Society of India)</li>
                            <li>3. GDSC (Google Developer Students Club)</li>
                            <li>4. IETE (Institution of Electronics and Telecommunication Engineers)</li>
                            <li>5. IEEE (Institute of Electrical and Electronics Engineers)</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>Hackathons</h2>

                        <ul className="pt-2">
                            <li>1. SIH (Smart India Hackathon)</li>
                            <li>2. Kavach Hackathon</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default TechEventList