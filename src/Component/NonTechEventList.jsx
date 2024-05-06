import Navbar from "./Navbar"
import Footer from "./Footer"
const NonTechEventList = () => {
    return (
        <>
            <Navbar/>
            <div className="p-5 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-violet-700 dark:text-white">Non-Technical Event List</h2>

                <div className="mt-5 flex flex-col w-full items-center justify-center rounded-lg">
                    <div className="p-3 text-xl font-bold text-white bg-violet-500 w-full flex flex-col items-center justify-center rounded-t-lg">
                        <h2>Event List</h2>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center">
                        <h2>I. Literary</h2>

                        <ul className="pt-2">
                            <li>1. Debate</li>
                            <li>2. Elocution</li>
                            <li>3. Poetry (Writing and Recitation)</li>
                            <li>4. Essay Writing</li>
                            <li>5. Story Writing</li>
                            <li>6. Review Writing</li>
                            <li>7. Trivia Writing</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>II. Performing Arts</h2>

                        <ul className="pt-2">
                            <li>1. Music (Western, Regional) - Solo, Duo, Group</li>
                            <li>2. Dance (Western, Regional) - Solo, Duo, Group, Dance Battle</li>
                            <li>3. Standup</li>
                            <li>4. Drama (Street Play, Stage Play, Film Making)</li>
                            <li>5. Fashion Walks/Shows</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>III. Fine Arts</h2>

                        <ul className="pt-2">
                            <li>1. Flag Painting</li>
                            <li>2. Poster Painting (Drawing, Digital)</li>
                            <li>3. Pot Painting</li>
                            <li>4. Face Painting</li>
                            <li>5. Makeup</li>
                            <li>6. Shutter Painting</li>
                            <li>7. Rangoli Making</li>
                            <li>8. Canvas Painting</li>
                            <li>9. Photography</li>
                            <li>10. Meme Making</li>
                            <li>11. Mask Painting / Making</li>
                            <li>12. Nail Arts</li>
                            <li>13. Glass Painting</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>IV. Gaming</h2>

                        <ul className="pt-2">
                            <li>1. CSGO</li>
                            <li>2. Valorant</li>
                            <li>3. BGMI ( Battlegrounds Mobile India</li>
                            <li>4. CODM (Call of Duty: Mobile)</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>V. Seminars</h2>

                        <ul className="pt-2">
                            <li>1. Non-Tech Seminars</li>
                            <li>2. Conductions Seminar</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>VI. Webinars</h2>

                        <ul className="pt-2">
                            <li>1. Non-Tech Webinars</li>
                            <li>2. Conductions Webinars</li>
                        </ul>
                    </div>
                    <div className="p-3 text-xl font-bold text-black bg-violet-200 w-full flex flex-col items-start justify-center rounded-b-lg">
                        <h2>VII. Workshops</h2>

                        <ul className="pt-2">
                            <li>1. Non-Tech Workshops</li>
                            <li>2. Conductions Workshops</li>
                            <li>3. ISHARE</li>
                            <li>4. Madgear Motorsports</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default NonTechEventList