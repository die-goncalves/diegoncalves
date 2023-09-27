import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function formattedCreationDate({ date }: { date: string }) {
  return dayjs(new Date(date))
    .locale('pt-br')
    .format('dddd, DD [de] MMMM [de] YYYY [-] hh[:]mm[:]ss a')
}

export function formattedUpdateDate({
  previousDate,
  lastDate
}: {
  previousDate: string
  lastDate: string
}) {
  return dayjs(new Date(previousDate))
    .locale('pt-br')
    .to(dayjs(new Date(lastDate)))
}
