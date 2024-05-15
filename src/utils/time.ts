import dayjs from 'dayjs'

const timeAgo = (time: Date) => {
  const yourTime = dayjs(time)
  const now = dayjs()
  const diffInMinutes = now.diff(yourTime, 'minute')
  let timeAgo

  if (diffInMinutes < 1) {
    timeAgo = 'vừa xong'
  } else {
    timeAgo = `${diffInMinutes} phút trước`
  }

  return timeAgo
}

export default timeAgo
