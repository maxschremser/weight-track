export function getFormattedDate(d: Date) {
  let yyyy = d.getFullYear();
  let mm:string  = '' + (d.getMonth()+1);
  if (mm.length < 2)
    mm = '0' + mm;

  let dd:string  = '' + d.getDate();
  if (dd.length < 2)
    dd = '0' + dd;

  return `${yyyy}-${mm}-${dd}`;
}

export function getFormattedDateTime(d: Date) {
  let HH:string  = '' + d.getHours();
  if (HH.length < 2)
    HH = '0' + HH;

  let mm:string  = '' + d.getMinutes();
  if (mm.length < 2)
    mm = '0' + mm;

  return `${getFormattedDate(d)} ${HH}:${mm}`;
}
