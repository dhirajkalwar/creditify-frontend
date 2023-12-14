const ErrorPage = () => {
    return (
        <>
            <div className="notfound m-15 text-center flex flex-col items-center">
                <h1 className="headerror text-[200px] font-bold">Oops !!</h1>
                <h2 className="text-3xl font-bold p-3">404 - Page not found</h2>
                <p className="text-xl font-medium text-center p-3 text w-[50%]">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <a href="/"><button className="p-3 m-2 w-40 bg-blue-500 text-white items-center justify-between flex flex-row font-bold cursor-pointer hover:border-2 hover:border-blue-500 hover:text-blue-500 rounded-full hover:bg-transparent"><i className='bx bx-home-alt text-2xl'></i> Back to Home</button></a>
            </div>
        </>
    )
}
export default ErrorPage;