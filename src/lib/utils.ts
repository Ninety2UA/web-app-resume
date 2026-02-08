export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDateRange(start: string, end: string | null): string {
  const formatDate = (d: string) => {
    const [year, month] = d.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[parseInt(month) - 1]} ${year}`
  }
  return `${formatDate(start)} – ${end ? formatDate(end) : 'Present'}`
}
