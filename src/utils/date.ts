import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function formatTimeToX({
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

export function formatDate({
  date,
  template
}: {
  date: string
  template?: string
}) {
  return dayjs(new Date(date)).locale('pt-br').format(template)
}
