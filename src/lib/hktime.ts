const HK_TIMEZONE = 'Asia/Hong_Kong'

/** Get the current date/time components in HK timezone */
export function getNowHK() {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: HK_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: parseInt(get('hour')),
    minute: parseInt(get('minute')),
  }
}

/** Get day of week (0=Sun, 6=Sat) for a YYYY-MM-DD date string in HK timezone */
export function getDayOfWeekHK(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: HK_TIMEZONE,
    weekday: 'short',
  })
  const weekday = formatter.format(d)
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  return map[weekday] ?? 0
}
