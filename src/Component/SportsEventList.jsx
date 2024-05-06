import Navbar from "./Navbar"
import Footer from "./Footer"
const SportsEventList = () => {
    return (
        <>
            <Navbar/>
            <div className="p-5 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-violet-700 dark:text-white">Sports Event List</h2>

                <div className="mt-5 flex flex-col w-full items-center justify-center rounded-lg">
                    <div className="p-3 text-xl font-bold text-white bg-violet-500 w-full flex flex-col items-center justify-center rounded-t-lg">
                        <h2>Event List</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>I. Track Games</h2>

                        <ul className="pt-2">
                            <li>1. 800m</li>
                            <li>2. 400m</li>
                            <li>3. 200m</li>
                            <li>4. Relay</li>
                            <li>5. Obstacle Race</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>II. Field Events</h2>

                        <ul className="pt-2">
                            <li>1. Discus</li>
                            <li>2. Javeling</li>
                            <li>3. Shot Put</li>
                            <li>4. Kabaddi</li>
                            <li>5. Football (Rink Field)</li>
                            <li>6. Basketball</li>
                            <li>7. Volleyball</li>
                            <li>8. Throwball</li>
                            <li>9. Handball</li>
                            <li>10. Box Cricket</li>
                            <li>11. Marathon</li>
                            <li>12. Tug-of-war</li>
                            <li>13. Field Cricket</li>
                            <li>14. Foot Volley</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>III. Indoor Games</h2>

                        <ul className="pt-2">
                            <li>1. Carrom</li>
                            <li>2. Chess</li>
                            <li>3. Table Tennis</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default SportsEventList