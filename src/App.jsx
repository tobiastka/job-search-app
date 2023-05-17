import { useMemo, useState } from 'react'
import jobs from './data.json'

function App () {
  const [searchTags, setSearchTags] = useState([])

  const handlerTags = (e) => {
    const newSearchTag = e.target.value
    const tagExistAlready = searchTags.includes(newSearchTag)
    if (!tagExistAlready) {
      setSearchTags(oldUserTags => [...oldUserTags, newSearchTag])
    }
  }

  const handlerClearAll = () => {
    setSearchTags([])
  }

  const handlerClearTag = (e) => {
    const tagOnClick = e.target.value
    const newSearchTags = searchTags.filter(tag => tag !== tagOnClick)
    setSearchTags(newSearchTags)
  }

  const filteredJobs = useMemo(() => {
    return searchTags.length
      ? jobs
        .map(job => { return { ...job, tags: [job.role, job.level, ...job.languages, ...job.tools] } })
        .filter(job => searchTags.every(tag => job.tags.includes(tag)))
      : jobs
  }, [searchTags])

  return (
    <div className='bg-teal-50'>
      <header className='bg-teal-600 max-h-24 overflow-hidden'>
        <img className='w-full' src='\bg-header-desktop.svg' alt='banner page' />
      </header>
      <main className='relative pt-20'>
        <div className='w-5/6 mx-auto'>

          <div className={`flex flex-row flex-wrap items-center w-5/6 lg:p-6 p-4 bg-white rounded-lg shadow-xl absolute top-0 -translate-y-1/3 transition-all ${searchTags.length ? 'opacity-100' : 'opacity-0'}`}>
            <div className='h-full flex flex-1 lg:gap-4 gap-2 flex-wrap'>
              {
                searchTags.map(tag => {
                  return (
                    <div className='flex flex-row items-center bg-teal-50 text-teal-600  rounded-lg  overflow-hidden hover:shadow-md transition-shadow h-8' key={tag}>
                      <div className='mx-2'>{tag}</div>
                      <button value={tag} onClick={handlerClearTag} className='transition-colors min-h-full w-8 bg-teal-600 hover:bg-teal-950 items-center justify-center flex'>
                        <img className='pointer-events-none' src='src/images/icon-remove.svg' alt='' />
                      </button>
                    </div>
                  )
                })
              }
            </div>
            <button onClick={handlerClearAll} className='font-semibold ml-auto text-teal-600 text-lg hover:underline underline-offset-2 transition-all'>Clear</button>
          </div>

          <div className={`transition-all flex gap-12 lg:gap-5 flex-col ${searchTags.length ? 'lg:pt-0 pt-8' : 'pt-0'}`}>
            {
            filteredJobs.map(job => {
              const tags = [job.role, job.level, ...job.languages, ...job.tools]
              return (
                <div key={job.id} className={`flex flex-col relative lg:flex-row gap-5 lg:items-center bg-white shadow-lg rounded-l p-6 lg:max-h-32 pt-10 lg:pt-6 ${job.featured && 'border-teal-600 border-l-4'}`}>

                  <img className='w-16 h-16 absolute top-0 -translate-y-1/2 lg:static lg:translate-y-0 transition-all' src={job.logo} alt='Job logo' />

                  <div className='flex flex-col gap-1 after:content-[""] after:w-full after:border-t-2 after:border-teal-950 after:mt-6 after:rounded-xl  lg:after:opacity-0 lg:after:mt-0 '>
                    <div className='flex flex-row gap-3'>
                      <div className='font-semibold text-teal-600'>{job.company}</div>
                      {job.new && <div className='font-semibold text-white bg-teal-600 rounded-xl px-2 py-0.5'>NEW!</div>}
                      {job.featured && <div className='font-semibold text-white bg-teal-950 rounded-xl px-2 py-0.5'>FEATURED</div>}
                    </div>
                    <div className='font-bold text-teal-950 text-lg'>
                      {job.position}
                    </div>
                    <div className='flex flex-row text-neutral-600 font-semibold flex-wrap'>
                      <div className='after:content-["."] after:mx-2 after:font-extrabold'>{job.postedAt}</div>
                      <div className='after:content-["."] after:mx-2 after:font-extrabold'>{job.contract}</div>
                      <div>{job.location}</div>
                    </div>
                  </div>

                  <div className='flex flex-row flex-wrap items-center lg:ml-auto gap-2'>
                    {tags.map(tag => <button className='cursor-pointer bg-teal-50 rounded-lg text-teal-600 font-semibold p-2 hover:bg-teal-600 hover:text-white transition-colors' key={tag} value={tag} onClick={handlerTags}>{tag}</button>)}
                  </div>

                </div>
              )
            })
          }
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
