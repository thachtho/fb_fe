
interface IProp {
    distance: number
}

function Distance({ distance }: IProp) {
  return (
    <>
        {distance && (
            <div className="flex">
                <i className="text-x text-red-600">Cách bạn: {distance} km</i>
                <span className="mx-2">|</span>
                <i className="text-x text-red-600">(2km - 5 phút)</i>
            </div>
        )}
    </>
  )
}

export default Distance
