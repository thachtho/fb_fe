import { IPost, ITimeOfPost } from "shared/interface"

interface IProp extends Pick<IPost, 'distance' | 'time' | 'distanceAB'>  {}

function Distance({ distance, distanceAB, time }: IProp) {
  return (
    <>
        {distance && (
            <div className="flex">
                <i className="text-x text-red-600">Cách bạn: {distance} km</i>
                {distanceAB && time?.minutes &&
                  <>
                    <span className="mx-2">|</span>
                    <i className="text-x text-red-600">({distanceAB}km - {time?.minutes} phút)</i> 
                  </>
                }

            </div>
        )}
    </>
  )
}

export default Distance
